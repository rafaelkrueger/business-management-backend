import { Controller, Get, Param } from '@nestjs/common';
import { EnterpriseService } from '../services/enterprise.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Enterprise')
@Controller('enterprise')
export class EnterpriseController {
    constructor(private readonly enterpriseService: EnterpriseService) {}


    @Get('/:userId')
    async findUser(@Param('userId') userId: string) {
      return await this.enterpriseService.findUserCompanies(userId);
    }
}
