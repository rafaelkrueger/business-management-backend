import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEnterprise } from './user-enterprise.entity';

@Entity({ name: 'enterprise' })
export class Enterprise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'logo', nullable: true })
  logo: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'document', nullable: true })
  document: string;

  @Column({ name: 'active', nullable: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
