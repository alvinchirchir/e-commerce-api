import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductResponseDto } from '../models/product/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/product/product.entity';
import { ProductAttribute } from '../models/attribute/attribute.entity';
import { ProductAttributeType } from '../models/attribute/attribute_type.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { SingleAttributeTypeDto, SingleAttributeTypeProductDto, Status } from '../models/attribute/attribute_type.dto';

@Injectable()
export class AttributeTypeService {
  constructor(
    @InjectRepository(ProductAttributeType)
    private readonly attributeTypeRepository: Repository<ProductAttributeType>,
  ) {}

  async createAttributeType(payload): Promise<SingleAttributeTypeDto> {
    try {
      return await this.attributeTypeRepository.save(payload);
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

  async getAttributeTypes(page, limit): Promise<SingleAttributeTypeDto[]> {
    const skippedItems = (page - 1) * limit;

    try {

        return await this.attributeTypeRepository
        .createQueryBuilder('product_attribute_type')
        .leftJoinAndSelect('product_attribute_type.attributes', 'attributes')
        .orderBy('product_attribute_type.date_created', 'ASC')

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

  async getAttributeTypeByAttributeTypeId(id: string): Promise<SingleAttributeTypeDto> {


    try {
 

        return await this.attributeTypeRepository
        .createQueryBuilder('product_attribute_type')
        .leftJoinAndSelect('product_attribute_type.attributes', 'attributes')
        .where('product_attribute_type.id= :id', { id })
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

  async getProductsByAttributeTypeId(
    page,
    limit,
    id,
  ): Promise<ProductResponseDto[]> {
  
    const skippedItems = (page - 1) * limit;
    try {


      let productCategory: SingleAttributeTypeProductDto =
      await this.attributeTypeRepository
        .createQueryBuilder('product_attribute_type')
        .leftJoinAndSelect('product_attribute_type.products', 'products')
        .leftJoinAndSelect('product_attribute_type.attributes', 'attributes')
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

  async updateAttributeType(
    attribute_type_id: string,
    payload,
  ): Promise<SingleAttributeTypeDto> {
    let status = [];

    try {
      if (typeof payload.attribute_type_id !== 'undefined') {
        delete payload.attribute_type_id;
      }
      const prevAttributeType = await this.attributeTypeRepository.findOne(attribute_type_id);

      payload['id'] = attribute_type_id;
      let upd_attribute_type = await this.attributeTypeRepository.save(payload);
      return Object.assign(prevAttributeType, upd_attribute_type);

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

  async deleteAttributeType(attribute_type_id: string): Promise<Status> {
    try {
      const delAttributeType = await this.attributeTypeRepository.findOne(attribute_type_id);

      await this.attributeTypeRepository.delete(attribute_type_id);
      let status = {
        success: true,
        statusCodeDB: 200,
        statusMessage: `${delAttributeType.name} successfully deleted`,
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
