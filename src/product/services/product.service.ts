import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  ProductResponseDto,
  Status,
} from '../models/product/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/product/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { TagService } from './tag.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  async createProduct(payload: object): Promise<object> {
    try {
      return await this.productRepository.save(payload);

      //await this.inventoryService.createProductInventory(payload);

      //Check whether images has been passed
    } catch (error) {
      let status = {
        success: false,
        statusCodeDB: error.code,
        statusMessage: error.detail,
        timestamp: new Date().toISOString(),
      };
      throw new HttpException(status, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async getProducts(page, limit): Promise<object[]> {
    const skippedItems = (page - 1) * limit;
    try {
      return await this.productRepository
        .createQueryBuilder('products')
        .leftJoinAndSelect('products.categories', 'categories')
        .leftJoinAndSelect('products.images', 'images')
        .orderBy('products.date_created', 'ASC')
        .skip(skippedItems)
        .take(limit)
        .getMany();
    } catch (error) {
      let status = {
        success: false,
        statusCodeDB: error.code,
        statusMessage: error.detail,
        timestamp: new Date().toISOString(),
      };
      throw new HttpException(status, HttpStatus.NOT_FOUND);
    }
  }

  async getProductByProductId(id: string): Promise<object> {
    try {
      return await this.productRepository
        .createQueryBuilder('products')
        .leftJoinAndSelect('products.categories', 'categories')
        .leftJoinAndSelect('products.images', 'images')
        .where('products.id= :id', { id })
        .orderBy('products.date_created', 'ASC')
        .getOne();
    } catch (error) {
      let status = {
        success: false,
        statusCodeDB: error.code,
        statusMessage: error.detail,
        timestamp: new Date().toISOString(),
      };
      throw new HttpException(status, HttpStatus.CONFLICT);
    }
  }

  async updateProduct(
    product_id: string,
    payload,
  ): Promise<object> {
    let product = [];
    let productObj = {};
    let productUpdate = {};

    try {
      productObj = await this.productRepository.findOne(product_id, {
        relations: ['categories', 'images', 'inventory', 'tags'],
      });
      product.push(productObj);

      if (typeof payload.quantity !== 'undefined') {
        delete product[0].inventory.quantity;

        product[0].inventory['quantity'] = payload.quantity;
      }

      if (typeof payload.category_ids !== 'undefined') {
        const id = payload.category_ids;
        //delete category ids
        delete payload.category_ids;

        let arr = [];

        for (let i = 0; i < id.length; i++) {
          let categ = await this.categoryService.getCategoryByCategoryId(id[i]);
          arr.push(categ);
        }

        //Add categories object
        product[0]['categories'] = arr;
      }

      if (typeof payload.images !== 'undefined') {
        delete product[0].images;
        product[0]['images'] = payload.images;

        //await this.imageService.createProductImage(product[0]);
      }

      if (typeof payload.tag_ids !== 'undefined') {
        const id = payload.tag_ids;
        //delete category ids
        delete payload.tag_ids;

        let arr = [];

        for (let i = 0; i < id.length; i++) {
          let tag = await this.tagService.getTagByTagId(id[i]);
          arr.push(tag);
        }

        payload['tags'] = arr;
      }

      const prev = await this.productRepository.findOne(product_id);

      productUpdate = await this.productRepository.save(product[0]);

      return Object.assign(prev, productUpdate);
    } catch (error) {
      let status = {
        success: false,
        statusCodeDB: error.code,
        statusMessage: error.detail,
        timestamp: new Date().toISOString(),
      };
      throw new HttpException(status, HttpStatus.CONFLICT);
    }
  }

  async deleteProduct(product_id: string): Promise<Status> {
    try {
      const delProd = await this.productRepository.findOne(product_id);

      await this.productRepository.delete(product_id);

      let status = {
        success: true,
        statusCodeDB: 200,
        statusMessage: `${delProd.name} successfully deleted`,
        timestamp: new Date().toISOString(),
      };
      return status;
    } catch (error) {
      let status = {
        success: false,
        statusCodeDB: error.code,
        statusMessage: error.detail,
        timestamp: new Date().toISOString(),
      };
      throw new HttpException(status, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
