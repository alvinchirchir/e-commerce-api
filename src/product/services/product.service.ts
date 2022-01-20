import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  
  CreateProductDto,
  ProductResponseDto,
  Status,
} from '../models/product/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/product/product.entity';
import { Repository } from 'typeorm';
import { DiscountService } from './discount.service';
import { CategoryService } from './category.service';
import {TagService} from './tag.service';
import {AttributeTypeService} from './attribute_type.service'


import { Inventory } from '../models/inventory/inventory.entity';
import { SingleDiscountDto } from '../models/discount/discount.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private readonly discountService: DiscountService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly attributeTypeService: AttributeTypeService
  ) {}

  async createProduct(payload: CreateProductDto): Promise<ProductResponseDto> {
    let status = [];

    try {
      //Check whether discount code has been passed
      if (typeof payload.discount_id !== 'undefined') {
        const id = payload.discount_id;
        //Delete discount id
        delete payload.discount_id;

        //Fetch discount details
        const discountDetails: SingleDiscountDto =
          await this.discountService.getDiscountByDiscountId(id);

          console.log(discountDetails)

        let discount_percent = discountDetails.discount_percent;

        let discount_price = payload.price * (1 - discount_percent / 100);

        payload['discount_price'] = discount_price;

        //Add discount object
        payload['discount'] = discountDetails;
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
        // //Fetch discount details
        // const categoryDetails =
        //   await this.categoryService.getCategoryByCategoryId(id);
        //   console.log(categoryDetails)

        //Add categories object
        payload['categories'] = arr;
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
        // //Fetch discount details
        // const categoryDetails =
        //   await this.categoryService.getCategoryByCategoryId(id);
        //   console.log(categoryDetails)

        //Add categories object
        payload['tags'] = arr;
      }

      if (typeof payload.attribute_type_ids !== 'undefined') {
        const id = payload.attribute_type_ids;
        //delete category ids
        delete payload.attribute_type_ids;

        let arr = [];

        for (let i = 0; i < id.length; i++) {
          let attribute_type = await this.attributeTypeService.getAttributeTypeByAttributeTypeId(id[i]);
          arr.push(attribute_type[0]);
        }
        // //Fetch discount details
        // const categoryDetails =
        //   await this.categoryService.getCategoryByCategoryId(id);
        //   console.log(categoryDetails)

        //Add categories object
        payload['attribute_types'] = arr;
      }



      let quantity = 0;

      if (typeof payload.quantity !== 'undefined') {
        quantity = payload.quantity;
      }
      const inventory = this.inventoryRepository.create({
        quantity: quantity,
      });

      payload['inventory'] = inventory;

      
      if (typeof payload.images !== 'undefined') {

        payload['images'] = payload.images;

        //await this.imageService.createProductImage(payload);
      }


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

  async getProducts(page, limit): Promise<ProductResponseDto[]> {

    const skippedItems = (page - 1) * limit;
    try {
      // return await this.productRepository.find({
      //   relations: ['discount', 'categories', 'inventory', 'images','attribute_types'],
      // });
      return await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.discount', 'discount')
      .leftJoinAndSelect('products.categories', 'categories')
      .leftJoinAndSelect('products.inventory', 'inventory')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.attribute_types', 'attribute_types')
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

  async getProductByProductId(id: string): Promise<ProductResponseDto> {

    try {
      // product = await this.productRepository.findOne(id, {
      //   relations: ['discount', 'categories', 'images', 'inventory','attribute_types'],
      // });

      return await this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.discount', 'discount')
      .leftJoinAndSelect('products.categories', 'categories')
      .leftJoinAndSelect('products.inventory', 'inventory')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.attribute_types', 'attribute_types')
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
  ): Promise<ProductResponseDto> {
    let product = [];
    let productObj={}
    let productUpdate={}

    try {

      productObj = await this.productRepository.findOne(product_id, {
        relations: ['discount', 'categories', 'images', 'inventory','tags','attribute_types'],
      });
      product.push(productObj)

      if (typeof payload.quantity !== 'undefined') {
        delete product[0].inventory.quantity;

        product[0].inventory['quantity'] = payload.quantity;
      }

      if (typeof payload.discount_id !== 'undefined') {
        const id = payload.discount_id;
        //Delete discount id
        delete payload.discount_id;

        //Fetch discount details
        let  discountDetails:SingleDiscountDto= await this.discountService.getDiscountByDiscountId(id);

        let discount_percent = discountDetails.discount_percent;

        let discount_price = product[0].price * (1 - discount_percent / 100);

        product[0]['discount_price'] = discount_price;

        //Add discount object
        product[0]['discount'] = discountDetails;
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
        // //Fetch discount details
        // const categoryDetails =
        //   await this.categoryService.getCategoryByCategoryId(id);
        //   console.log(categoryDetails)

        //Add categories object
        product[0]['categories'] = arr;
      }

      if (typeof payload.images !== 'undefined') {
        delete product[0].images
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
      if (typeof payload.attribute_type_ids !== 'undefined') {
        const id = payload.attribute_type_ids;
        //delete category ids
        delete payload.attribute_type_ids;

        let arr = [];

        for (let i = 0; i < id.length; i++) {
          let attribute_type = await this.attributeTypeService.getAttributeTypeByAttributeTypeId(id[i]);
          arr.push(attribute_type[0]);
        }

        payload['attribute_types'] = arr;
      }


      const prev = await this.productRepository.findOne(product_id);

       productUpdate=await this.productRepository.save(product[0]);

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
