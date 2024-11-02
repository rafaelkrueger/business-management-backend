import { Controller, Get, Param } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../entities/customer.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/:companyId')
  async findUser(@Param('companyId') companyId: string): Promise<Customer[]> {
    return await this.customerService.findCompaniesCustomers(companyId);
  }

  @Get('/glance/:companyId')
  async glance(@Param('companyId') companyId: string) {
    const total = await this.customerService.total(companyId);
    const genders = await this.customerService.countGenderCustomers(companyId);
    const activity = await this.customerService.activity(companyId);
    const weekCount = await this.customerService.getCustomersCountsByDay(
      companyId,
    );
    const ages = await this.customerService.findCompanyCustomersByAge(
      companyId,
    );
    return {
      ages: ages,
      genders: genders,
      activity: activity,
      weekCount: weekCount,
      total: total,
    };
  }
}
