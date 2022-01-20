import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductResponseDto } from '../models/product/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/product/product.entity';
import { Category } from '../models/category/category.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  SingleCategoryDto,
  SingleCategoryProductDto,
  Status,
} from '../models/category/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(payload): Promise<SingleCategoryDto> {
    try {
      return await this.categoryRepository.save(payload);
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

  async getCategories(page, limit): Promise<SingleCategoryDto[]> {
    const skippedItems = (page - 1) * limit;
    try {
      return await this.categoryRepository
        .createQueryBuilder('product_category')
        .leftJoinAndSelect('product_category.images', 'images')
        .orderBy('product_category.date_created', 'ASC')
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

  async getCategoryByCategoryId(id: string): Promise<SingleCategoryDto> {
    try {
      return await this.categoryRepository
        .createQueryBuilder('product_category')
        .leftJoinAndSelect('product_category.images', 'images')
        .where('product_category.id= :id', { id })
        .getOne();
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

  async getProductsByCategoryId(
    page,
    limit,
    id,
  ): Promise<ProductResponseDto[]> {
    const skippedItems = (page - 1) * limit;
    try {
      let productCategory: SingleCategoryProductDto =
        await this.categoryRepository
          .createQueryBuilder('product_category')
          .leftJoinAndSelect('product_category.products', 'products')
          .leftJoinAndSelect('products.images', 'images')
          .skip(skippedItems)
          .take(limit)
          .where('product_category.id= :id', { id })
          .getOne();
      let arr = [];
      arr = productCategory.products;

      return arr;
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

  async updateCategory(category_id: string, payload): Promise<SingleCategoryDto> {

    try {
      if (typeof payload.category_id !== 'undefined') {
        delete payload.category_id;
      }
      const prevCategory = await this.categoryRepository.findOne(category_id);

      payload['id'] = category_id;
      let updCategory = await this.categoryRepository.save(payload);
      return Object.assign(prevCategory, updCategory);

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

  async deleteCategory(category_id: string): Promise<Status> {
    try {
      const delCategory = await this.categoryRepository.findOne(category_id);

      await this.categoryRepository.delete(category_id);
      let status = {
        success: true,
        statusCodeDB: 200,
        statusMessage: `${delCategory.name} successfully deleted`,
        timestamp: new Date().toISOString(),
      };
      return status

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
