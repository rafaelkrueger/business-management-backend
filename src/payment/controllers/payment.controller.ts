import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payment } from '../entities/payment.entity';
import { PaymentService } from '../services/payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/:companyId')
  async findUser(@Param('companyId') companyId: string): Promise<Payment[]> {
    return await this.paymentService.findAllPayments(companyId);
  }

  @Get('/glance/:companyId')
  async glance(@Param('companyId') companyId: string) {
    return await this.paymentService.glance(companyId);
  }

}
