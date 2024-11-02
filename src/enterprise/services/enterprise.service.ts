import { EnterpriseDto } from '../dto/enterprise.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Enterprise } from '../entities/enterprise.entity';
import { UserEnterprise } from '../entities/user-enterprise.entity';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
    @InjectRepository(UserEnterprise)
    private readonly userEnterprise: Repository<UserEnterprise>,
  ) {}

  async findUserCompanies(userId: string): Promise<Enterprise[]> {
    const userEnterprises = await this.userEnterprise.find({
      where: { userId: userId },
      select: ['companyId'],
    });
    const companiesId = await userEnterprises.map(
      (list) => `'${list.companyId}'`,
    );
    const companies = await this.userEnterprise.query(`
      SELECT * FROM "enterprise" WHERE "enterprise"."id" IN(${companiesId});
      `);
    return companies;
  }

  async findAllUsers(): Promise<Enterprise[]> {
    return this.enterpriseRepository.find();
  }

  async createUser(userDTO: EnterpriseDto): Promise<EnterpriseDto> {
    const createdUser = await this.enterpriseRepository.save(userDTO);
    return createdUser;
  }
}
