import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnterpriseModules } from '../entities/enterpriseModules.entity';
import { DashboardModules } from '../entities/modules.entity';

@Injectable()
export class DashboardModulesService {
  constructor(
    @InjectRepository(EnterpriseModules)
    private readonly enterpriseModulesRepository: Repository<EnterpriseModules>,
    @InjectRepository(DashboardModules)
    private readonly dashboardModulesRepository: Repository<DashboardModules>,
  ) {}

  async findEnterpriseModules(companyId: string) {
    const modules = []
    const enterpriseModules = await this.enterpriseModulesRepository.find({
      where: { companyId: companyId, isActive: true },
    });
    for (const enterpriseModule of enterpriseModules) {
      const modulesActive = await this.dashboardModulesRepository.findOne({
        where: { id: enterpriseModule.moduleId, isActive: true },
      });
      modules.push(modulesActive);
    }
    return modules;
  }
}
