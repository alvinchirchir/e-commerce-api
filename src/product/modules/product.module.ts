import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';

import {Product} from "../models/product/product.entity";
import {Discount} from "../models/discount/discount.entity";
import {Inventory} from "../models/inventory/inventory.entity";
import {Category} from "../models/category/category.entity";
import { ImageEntity} from "../models/product/image.entity";
import {DiscountController} from "../controllers/discount.controller";
import {DiscountService} from "../services/discount.service"
import {CategoryController} from "../controllers/category.controller";
import {CategoryService} from '../services/category.service';
import {InventoryController} from '../controllers/inventory.controller';
import {InventoryService} from '../services/inventory.service';
import {ImageService} from '../services/image.service';
import {ProductImageCategoryEntity} from "../models/category/category_image.entity";
import {ProductImageDiscountEntity} from "../models/discount/discount_image.entity";
import {Tag} from "../models/tag/tag.entity";
import {ProductImageTagEntity} from "../models/tag/tag_image.entity";
import {TagController} from "../controllers/tag.controller copy";
import {TagService} from "../services/tag.service";
import {AttributeTypeController} from "../controllers/attribute_type.controller";
import {AttributeTypeService} from "../services/attribute_type.service"
import {ProductAttributeType} from "../models/attribute/attribute_type.entity";
import {ProductAttribute} from "../models/attribute/attribute.entity";



@Module({
    imports:[TypeOrmModule.forFeature([Discount,Product,Inventory,Category,ImageEntity,ProductImageCategoryEntity,ProductImageDiscountEntity,Tag,ProductImageTagEntity,ProductAttribute,ProductAttributeType])],
    controllers:[ProductController,AttributeTypeController,DiscountController,CategoryController,InventoryController,TagController],
    providers:[ProductService,DiscountService,AttributeTypeService,CategoryService,InventoryService,ImageService,TagService],
})
export class ProductModule {}
