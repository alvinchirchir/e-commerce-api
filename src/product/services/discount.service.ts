import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ProductResponseDto,
} from '../models/product/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from '../models/discount/discount.entity';
import { Repository } from 'typeorm';
import {
  CreateDiscountDto,
  SingleDiscountDto,
  SingleDiscountProductDto,
  Status,
} from '../models/discount/discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async createDiscount(payload: CreateDiscountDto): Promise<SingleDiscountDto> {
    try {
      return await this.discountRepository.save(payload);
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

  async getDiscounts(page, limit): Promise<SingleDiscountDto[]> {
    const skippedItems = (page - 1) * limit;
    try {
      return await this.discountRepository
        .createQueryBuilder('product_discount')
        .leftJoinAndSelect('product_discount.images', 'images')
        .orderBy('product_discount.date_created', 'ASC')
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

  async getDiscountByDiscountId(id: string): Promise<SingleDiscountDto> {
    try {
      return await this.discountRepository
        .createQueryBuilder('product_discount')
        .leftJoinAndSelect('product_discount.images', 'images')
        .where('product_discount.id= :id', { id })
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

  async getProductsByDiscountId(
    page,
    limit,
    id,
  ): Promise<ProductResponseDto[]> {
    const skippedItems = (page - 1) * limit;
    try {
      let productDiscount: SingleDiscountProductDto =
        await this.discountRepository
          .createQueryBuilder('product_discount')
          .leftJoinAndSelect('product_discount.products', 'products')
          .leftJoinAndSelect('products.images', 'images')
          .skip(skippedItems)
          .take(limit)
          .where('product_discount.id= :id', { id })
          .getOne();
      let arr = [];
      arr = productDiscount.products;

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

  async updateDiscount(discount_id: string, payload): Promise<SingleDiscountDto> {
    try {
      if (typeof payload.discount_id !== 'undefined') {
        delete payload.discount_id;
      }
      const prevDiscount = await this.discountRepository.findOne(discount_id);

      payload['id'] = discount_id;
      let updDiscount = await this.discountRepository.save(payload);

      return Object.assign(prevDiscount, updDiscount);
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

  async deleteDiscount(discount_id: string): Promise<Status> {
    try {
      const delDiscount = await this.discountRepository.findOne(discount_id);

      await this.discountRepository.delete(discount_id);
      let status = {
        success: true,
        statusCodeDB: 200,
        statusMessage: `${delDiscount.name} successfully deleted`,
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
