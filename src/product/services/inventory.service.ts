import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../models/inventory/inventory.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Product } from '../models/product/product.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async createProductInventory(payload): Promise<object[]> {
    let quantity=0;

    if (typeof payload.quantity !== 'undefined') {
      quantity = payload.quantity;
    }

    const inventory=this.inventoryRepository.create({
        quantity:quantity,
        product:payload
      });
      

    let status = [];
    try {
      status = [
        {
          success: true,
          message: 'Success inventory created',
        }, 
      ];

      await this.inventoryRepository.save(inventory);
    } catch (error) {
      status = [
        {
          success: false,
          message: error,
        },
      ];

      throw new HttpException(status, HttpStatus.NOT_ACCEPTABLE);
    }
    return status;
  }

  async getInventories(page, limit): Promise<object[]> {
    const skippedItems = (page - 1) * limit;
    let inventories = [];
    let status = [];

    try {
        inventories = await this.inventoryRepository
        .createQueryBuilder('product_inventory')
        .orderBy('product_inventory.date_created', 'ASC')
        .offset(skippedItems)
        .limit(limit)
        .getMany();
    } catch (error) {
      status = [
        {
          success: false,
          message: error,
        },
      ];

      throw new HttpException(status, HttpStatus.NOT_ACCEPTABLE);
    }

    return inventories;
  }

  async getInventoryByInventoryId(id: string): Promise<object[]> {
    //return from(this.productRepository.findOne({where:{product_code:product_code}}));
    let inventory=[];
    let status=[];
    
    try {

        inventory= await  this.inventoryRepository
      .createQueryBuilder('product_inventory')
      .where('id= :id', { id: id })
      .getMany();

      // products= await  this.productRepository
      // .createQueryBuilder('products')
      // .relation(Post, "discount")
      // .where('id= :id', { id: id })
      // .getMany()
      
    } catch (error) {
      status = [
        {
          success: false,
          message: "Inventory Id Invalid",
        },
      ];

      throw new HttpException(status, HttpStatus.NOT_FOUND);
      
    }
    return inventory
  }


  async getInventoryByProductId(product_id: string): Promise<object[]> {
    //return from(this.productRepository.findOne({where:{product_code:product_code}}));
    let inventory=[];
    let status=[];
    
    try {


      inventory = await this.inventoryRepository.find({
        relations: ['products'],
        where: (qb: SelectQueryBuilder<Product>) => {
          qb.where('product_id = :product_id', { product_id: product_id });
        },
      });
      


      // products= await  this.productRepository
      // .createQueryBuilder('products')
      // .relation(Post, "discount")
      // .where('id= :id', { id: id })
      // .getMany()
      
    } catch (error) {
      status = [
        {
          success: false,
          message: "Inventory Id Invalid",
        },
      ];

      throw new HttpException(status, HttpStatus.NOT_FOUND);
      
    }
    return inventory
  }


}
