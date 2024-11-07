import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'enterpriseModules' })
export class EnterpriseModules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'moduleId', type: 'text', nullable: false })
  moduleId: string;

  @Column({ name: 'companyId', type: 'text', nullable: false })
  companyId: string;

  @Column({ name: 'isActive', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
