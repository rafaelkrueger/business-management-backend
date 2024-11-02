import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/:companyId')
  async findEmployeeByCompany(@Param('companyId') companyId: string) {
    return await this.employeeService.findCompaniesEmployees(companyId);
  }

  @Post('')
  async create(@Body() body: any) {
    return await this.employeeService.create(body);
  }

  @Patch('')
  async patch(@Body() body: any) {
    return await this.employeeService.edit(body);
  }

  @Get('glance/:companyId')
  async glance(@Param('companyId') companyId: string) {
    const spends = await this.employeeService.sumSalariesByDepartment(
      companyId,
    );
    const activeEmployees = await this.employeeService.activity(
      companyId,
    );
    const departments = await this.employeeService.countEmployeesByDepartment(
      companyId,
    );
    return {
      spends: spends,
      departments: departments,
      activity: activeEmployees,
    };
  }
}
