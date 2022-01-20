import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductResponseDto } from '../models/product/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/product/product.entity';
import { Tag } from '../models/tag/tag.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { SingleTagDto, SingleTagProductDto, Status } from '../models/tag/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async createTag(payload): Promise<SingleTagDto> {
    try {
      return await this.tagRepository.save(payload);
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

  async getTags(page, limit): Promise<SingleTagDto[]> {

        //Pagination can be done, however if both page and limit are not passed all items will be fetched
        try {
          let query = this.tagRepository
          .createQueryBuilder('product_tag')
          .leftJoinAndSelect('product_tag.images', 'images')
          .orderBy('product_tag.date_created', 'ASC')
    
          if (typeof page != 'undefined' && typeof limit != 'undefined') {
            const skippedItems = (page - 1) * limit;
    
            return await query.skip(skippedItems).take(limit).getMany();
          }
          return await query.getMany();
  
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

  async getTagByTagId(id: string): Promise<SingleTagDto> {
    try {
      return await this.tagRepository
        .createQueryBuilder('product_tag')
        .leftJoinAndSelect('product_tag.images', 'images')
        .where('product_tag.id= :id', { id })
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

  async getProductsByTagId(page, limit, id): Promise<ProductResponseDto[]> {
  

    const skippedItems = (page - 1) * limit;
    try {

      let productTag: SingleTagProductDto =
      await this.tagRepository
        .createQueryBuilder('product_tag')
        .leftJoinAndSelect('product_tag.products', 'products')
        .leftJoinAndSelect('products.images', 'images')
        .skip(skippedItems)
        .take(limit)
        .where('product_tag.id= :id', { id })
        .getOne();
    let arr = [];
    arr = productTag.products;

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

  async updateTag(tag_id: string, payload): Promise<SingleTagDto> {
    try {
      payload['id'] = tag_id;
      let updtag = await this.tagRepository.save(payload);
      return updtag;
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

  async deleteTag(tag_id: string): Promise<Status> {
    try {
      const delCategory = await this.tagRepository.findOne(tag_id);

      await this.tagRepository.delete(tag_id);
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
