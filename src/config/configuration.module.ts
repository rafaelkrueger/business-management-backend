import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModules } from './entities/modules.entity';
import { EnterpriseModules } from './entities/enterpriseModules.entity';
import { DashboardModulesService } from './services/modules.service';
import { DashboardModulesController } from './controllers/modules.controller';

@Module({
  controllers: [DashboardModulesController],
  imports: [TypeOrmModule.forFeature([DashboardModules, EnterpriseModules])],
  providers: [DashboardModulesService],
  exports: []
})
export class ConfigurationModule {}
