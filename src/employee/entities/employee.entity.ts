import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity({ name: 'employee' })
  export class Employee {
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

    @Column({ name: 'birth', nullable: true })
    birth: Date;

    @Column({ name: 'hire', nullable: true })
    hire: Date;

    @Column({ name: 'job', nullable: true })
    job: string;

    @Column({ name: 'department', nullable: true })
    department: string;

    @Column({ name: 'salary', nullable: true })
    salary: number;

    @Column({ name: 'active', nullable: true })
    active: boolean;

    @Column({ name: 'enterprise', nullable: false })
    enterprise: string;

    @Column({ name: 'manager', nullable: true })
    manager: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
  }
