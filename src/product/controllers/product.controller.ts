import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.serivice';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}


    @Get('/:enterpriseId')
    async findProducts(@Param('enterpriseId') enterpriseId: string) {
      return await this.productService.findProducts(enterpriseId);
    }

    @Get('glance/:enterpriseId')
    async glance(@Param('enterpriseId') enterpriseId: string) {
      return await this.productService.glance(enterpriseId);
    }

    @Post('')
    async createProduct(@Body() body: any) {
      return await this.productService.create(body);
    }

    @Patch('')
    async editProduct(@Body() body: any) {
      return await this.productService.edit(body);
    }
}
