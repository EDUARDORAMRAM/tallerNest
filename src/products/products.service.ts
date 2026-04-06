import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>)
    {
  }
  
  create(createProductDto: CreateProductDto) {
        return this.ProductRepository.save(createProductDto);
  }

  findAll() {
    return this.ProductRepository.find(); 
  }

  async findOne(id: string) {
    const productFound= await this.ProductRepository.findOneBy({
      productId:id,
    });
    if (!productFound) throw new NotFoundException(`Product #${id} not found`);
        return productFound;
  }


  findByProvider(id: string) {
    return this.ProductRepository.findBy({
      provider: {
        providerId: id,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.ProductRepository.preload({
      productId : id,
      ...updateProductDto
    })
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    await this.ProductRepository.save(product);
   return product;
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.ProductRepository.delete({
      productId : id,
    })
    return {
      message: `Product #${id} has been deleted`
    }
  }
}


