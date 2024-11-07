import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardModulesService } from '../services/modules.service';

@ApiTags('Modules')
@Controller('modules')
export class DashboardModulesController {
  constructor(
    private readonly dashboardModulesService: DashboardModulesService,
  ) {}

  @Get('/:companyId')
  async findUser(@Param('companyId') companyId: string) {
    return await this.dashboardModulesService.findEnterpriseModules(companyId);
  }
}
