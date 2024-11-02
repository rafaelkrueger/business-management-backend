import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findProducts(enterpriseId: string) {
    const product = await this.productRepository.find({
      where: { company: enterpriseId },
    });
    return product;
  }

  async glance(enterpriseId: string) {
    const glanceStock = await this.productRepository.find({
      where: { company: enterpriseId },
      select: ['name', 'quantityInStock'],
    });
    const glanceSold = await this.productRepository
      .createQueryBuilder('product')
      .select('product.category', 'category')
      .addSelect('SUM(product.sold)', 'sold')
      .where('product.company = :enterpriseId', { enterpriseId })
      .groupBy('product.category')
      .getRawMany();
    return { glanceStock: glanceStock, glanceSold: glanceSold };
  }

  async create(body: any) {
    // Processar URL das files;
    const product = new Product();
    product.name = body.formData.name;
    product.description = body.formData.description;
    product.category = body.formData.category;
    product.price = Number(body.formData.price);
    product.cost = Number(body.formData.cost);
    product.quantityInStock = Number(body.formData.quantityInStock);
    product.height = Number(body.formData.height);
    product.width = Number(body.formData.width);
    product.length = Number(body.formData.length);
    product.company = body.activeCompany;
    product.status = body.formData.status;
    // product.images = body.formData.images;
    await this.productRepository.save(product);
  }

  async edit(body: any) {
    const product = await this.productRepository.findOne({
      where: { id: body.formData.id, company: body.activeCompany },
    });
    product.name = body.formData.name;
    product.description = body.formData.description;
    product.category = body.formData.category;
    product.price = Number(body.formData.price);
    product.cost = Number(body.formData.cost);
    product.quantityInStock = Number(body.formData.quantityInStock);
    product.height = Number(body.formData.height);
    product.width = Number(body.formData.width);
    product.length = Number(body.formData.length);
    product.company = body.activeCompany;
    product.status = body.formData.status;
    // product.images = body.formData.images;
    await this.productRepository.save(product);
  }
}
