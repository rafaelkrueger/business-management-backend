import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'category', nullable: false })
  category: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ name: 'cost', type: 'decimal', precision: 10, scale: 2, nullable: true })
  cost: number;

  @Column({ name: 'quantity_in_stock', nullable: false, default: 0 })
  quantityInStock: number;

  @Column({ name: 'height', type: 'decimal', precision: 10, scale: 2, nullable: true })
  height: number;

  @Column({ name: 'weight', type: 'decimal', precision: 10, scale: 2, nullable: true })
  weight: number;

  @Column({ name: 'width', type: 'decimal', precision: 10, scale: 2, nullable: true })
  width: number;

  @Column({ name: 'length', type: 'decimal', precision: 10, scale: 2, nullable: true })
  length: number;

  @Column({ name: 'milliliters', type: 'decimal', precision: 10, scale: 2, nullable: true })
  milliliters: number;

  @Column({ name: 'images', type: 'text', array: true, nullable: true })
  images: string[];

  @Column({ name: 'rating', type: 'decimal', precision: 2, scale: 1, nullable: true })
  rating: number;

  @Column({ name: 'status', nullable: false, default: 'active' })
  status: string;

  @Column({ name: 'sold', nullable: true, default: 0 })
  sold: number;

  @Column({ name: 'company', nullable: false })
  company: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
