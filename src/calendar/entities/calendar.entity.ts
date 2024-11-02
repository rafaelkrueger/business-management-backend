import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'calendar' })
export class Calendar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'companyId', nullable: false })
  companyId: string;

  @Column({ name: 'ownerId', nullable: false })
  ownerId: string;

  @Column('text', { name: 'participantsId', array: true, nullable: true })
  participantsId: string[];

  @Column({ name: 'isPublic', nullable: true })
  isPublic: boolean;

  @Column({ name: 'date', nullable: false })
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
