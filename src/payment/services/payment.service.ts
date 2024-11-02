import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async findAllPayments(companyId: string): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { companyId } });
  }

  async glance(companyId: string): Promise<{
    totalAmount: number;
    count: number;
    averageTicket: number;
    taxes: number;
  }> {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'totalAmount')
      .addSelect('COUNT(payment.id)', 'count')
      .addSelect('AVG(payment.amount)', 'averageTicket')
      .where('payment.companyId = :companyId', { companyId })
      .getRawOne();

    const totalAmount = Number(result.totalAmount) || 0;
    const taxes = totalAmount * 0.05;

    return {
      totalAmount,
      count: Number(result.count) || 0,
      averageTicket: Number(result.averageTicket) || 0,
      taxes,
    };
  }
}
