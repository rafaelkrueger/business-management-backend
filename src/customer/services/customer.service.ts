import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findCompaniesCustomers(companyId: string): Promise<Customer[]> {
    const userEnterprises = await this.customerRepository.find({
      where: { enterpriseId: companyId },
    });
    return userEnterprises;
  }

  async countGenderCustomers(companyId: string): Promise<{
    masculine: number;
    feminine: number;
  }> {
    const masculineCount = await this.customerRepository.count({
      where: { gender: 'Masculine', enterpriseId: companyId },
    });

    const feminineCount = await this.customerRepository.count({
      where: { gender: 'Feminine', enterpriseId: companyId },
    });

    return {
      masculine: masculineCount,
      feminine: feminineCount,
    };
  }

  async activity(companyId: string): Promise<{
    inactive: number;
    active: number;
  }> {
    const inactive = await this.customerRepository.count({
      where: { active: false, enterpriseId: companyId },
    });

    const active = await this.customerRepository.count({
      where: { active: true, enterpriseId: companyId },
    });

    return {
      inactive: inactive,
      active: active,
    };
  }

  async total(companyId: string): Promise<{
    total: number;
  }> {
    const total = await this.customerRepository.count({
      where: { enterpriseId: companyId },
    });

    return {
      total: total,
    };
  }


  async findCompanyCustomersByAge(
    companyId: string,
  ): Promise<Record<number, number>> {
    const customers = await this.customerRepository.find({
      where: { enterpriseId: companyId },
    });

    const ageCount: Record<number, number> = {};

    customers.forEach((customer) => {
      const age = this.calculateAge(customer.birthDate);
      if (ageCount[age]) {
        ageCount[age] += 1;
      } else {
        ageCount[age] = 1;
      }
    });

    return ageCount;
  }

  async getCustomersCountsByDay(companyId: string): Promise<Record<string, number>[]> {
    const today = new Date();
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);

    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay()); // Start of this week (Sunday)

    const counts = [];

    for (let i = 0; i < 7; i++) {
      const lastWeekDate = new Date(lastWeekStart);
      lastWeekDate.setDate(lastWeekStart.getDate() + i);

      const thisWeekDate = new Date(thisWeekStart);
      thisWeekDate.setDate(thisWeekStart.getDate() + i);

      // Format the keys for the results
      const lastWeekKey = `lastWeek${this.getDayName(lastWeekDate.getDay())}`;
      const thisWeekKey = `thisWeek${this.getDayName(thisWeekDate.getDay())}`;

      // Count for last week
      const lastWeekCount = await this.customerRepository
        .createQueryBuilder('customer')
        .where('customer.enterpriseId = :companyId', { companyId })
        .andWhere('customer.createdAt >= :start', {
          start: new Date(lastWeekDate.setHours(0, 0, 0, 0)),
        })
        .andWhere('customer.createdAt < :end', {
          end: new Date(lastWeekDate.setHours(24, 0, 0, 0)), // This will cover the entire day
        })
        .getCount();

      // Count for this week
      const thisWeekCount = await this.customerRepository
        .createQueryBuilder('customer')
        .where('customer.enterpriseId = :companyId', { companyId })
        .andWhere('customer.createdAt >= :start', {
          start: new Date(thisWeekDate.setHours(0, 0, 0, 0)), // Start of the day
        })
        .andWhere('customer.createdAt < :end', {
          end: new Date(thisWeekDate.setHours(24, 0, 0, 0)), // End of the day
        })
        .getCount();

      counts.push({
        [lastWeekKey]: lastWeekCount,
        [thisWeekKey]: thisWeekCount,
      });
    }

    return counts;
  }


  private getDayName(dayIndex: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }
}
