import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'phone', nullable: false, unique: true })
  phone: string;

  @Column({ name: 'gender', nullable: false })
  gender: string;

  @Column({ name: 'birthDate', nullable: true })
  birthDate: Date;

  @Column({ name: 'active', nullable: true })
  active: boolean;

  @Column({ name: 'enterpriseId', nullable: false })
  enterpriseId: string;

  @Column({ name: 'userId', nullable: true })
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
