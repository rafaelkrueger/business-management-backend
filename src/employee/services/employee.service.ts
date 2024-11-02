import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findCompaniesEmployees(companyId: string) {
    const userEnterprises = await this.employeeRepository.find({
      where: { enterprise: companyId },
    });
    return userEnterprises;
  }


  async create(body: any) {
    const employee = new Employee();
    employee.name = body.formData.name;
    employee.email = body.formData.email;
    employee.phone = body.formData.phone;
    employee.gender = body.formData.gender;
    employee.job = body.formData.job;
    employee.department = body.formData.department;
    employee.enterprise = body.companyId;
    employee.active = body.formData.active !== 'off' ? true : false;
    employee.birth = body.formData.birth;
    employee.hire = body.formData.hire;
    employee.salary = Number(body.formData.salary);
    employee.manager = body.formData.manager;
    await this.employeeRepository.save(employee);
  }

  async edit(body: any) {
    const employee = await this.employeeRepository.findOne({
      where: { id: body.formData.id, enterprise: body.companyId },
    })
    employee.name = body.formData.name;
    employee.email = body.formData.email;
    employee.phone = body.formData.phone;
    employee.gender = body.formData.gender;
    employee.job = body.formData.job;
    employee.department = body.formData.department;
    employee.enterprise = body.companyId;
    employee.active = body.formData.active !== 'off' ? true : false;
    employee.birth = body.formData.birth;
    employee.hire = body.formData.hire;
    employee.salary = Number(body.formData.salary);
    // employee.manager = body.formData.manager;
    await this.employeeRepository.save(employee);
  }

  async activity(companyId: string): Promise<{
    inactive: number;
    active: number;
  }> {
    const inactive = await this.employeeRepository.count({
      where: { active: false, enterprise: companyId },
    });

    const active = await this.employeeRepository.count({
      where: { active: true, enterprise: companyId },
    });

    return {
      inactive: inactive,
      active: active,
    };
  }

  async countEmployeesByDepartment(
    companyId: string,
  ): Promise<{ department: string; count: number }[]> {
    const result = await this.employeeRepository
      .createQueryBuilder('employee')
      .select('employee.department AS department')
      .addSelect('COUNT(employee.id) AS count')
      .where('employee.enterprise = :companyId', { companyId })
      .groupBy('employee.department')
      .getRawMany();

    return result.map((item) => ({
      department: item.department,
      count: parseInt(item.count, 10),
    }));
  }

  async sumSalariesByDepartment(
    companyId: string,
  ): Promise<{ department: string; totalSalary: number }[]> {
    const result = await this.employeeRepository
      .createQueryBuilder('employee')
      .select('employee.department AS department')
      .addSelect('SUM(employee.salary) AS totalSalary')
      .where('employee.enterprise = :companyId', { companyId })
      .groupBy('employee.department')
      .getRawMany();

    return result.map((item) => ({
      department: item.department,
      totalSalary: parseFloat(item.totalSalary),
    }));
  }
}
