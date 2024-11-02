import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'userEnterprise' })
export class UserEnterprise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'userId', nullable: false })
  userId: string;

  @Column({ name: 'companyId', nullable: false })
  companyId: string;
}