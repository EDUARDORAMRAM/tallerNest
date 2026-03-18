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
  private products: CreateProductDto[] = [{

    productId: uuid(),
    productName: "Sabritas",
    price: 10,
    countSeal: 4,
    provider:uuid()  
  }, 
  {
    productId: uuid(),
    productName: "CocaCola",
    price: 20,
    countSeal: 10,
    provider:uuid() 
  }
  ]
  create(createProductDto: CreateProductDto) {
    const savedProduct = this.ProductRepository.save(createProductDto);
    return savedProduct;
  }

  findAll() {
    return this.ProductRepository.find();
  }

  findOne(id: string) {
    const productFound=this.ProductRepository.findOneBy({
      productId:id,
    });
    if (!productFound) throw new NotFoundException(`Product #${id} not found`);
        return productFound;
  }


  findByProvider(id: string) {
    const productsFound = this.products.filter((product)=>product.provider === id)
    if (!productsFound) throw new NotFoundException(`Provider #${id} not found`);
    return productsFound;
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

  remove(id: string) {
    this.findOne(id)
    this.ProductRepository.delete({
      productId : id,
    })
    return {
      message: `Product #${id} had been deleted`
    }
  }
}


