import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'modules' })
export class DashboardModules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'icon', type: 'varchar', nullable: true })
  icon: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({ type: 'text', nullable: false })
  key: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'isActive', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
