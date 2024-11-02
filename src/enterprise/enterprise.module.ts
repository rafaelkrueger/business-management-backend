import { Module } from '@nestjs/common';
import { EnterpriseController } from './controllers/enterprise.controller';
import { EnterpriseService } from './services/enterprise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { UserEnterprise } from './entities/user-enterprise.entity';

@Module({
  controllers: [EnterpriseController],
  imports: [TypeOrmModule.forFeature([Enterprise, UserEnterprise])],
  providers: [EnterpriseService],
  exports: [EnterpriseService, TypeOrmModule]
})
export class EnterpriseModule {}
