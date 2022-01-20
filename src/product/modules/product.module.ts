import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';

import {Product} from "../models/product/product.entity";
import {Category} from "../models/category/category.entity";
import { ImageEntity} from "../models/product/image.entity";

import {CategoryController} from "../controllers/category.controller";
import {CategoryService} from '../services/category.service';
import {ImageService} from '../services/image.service';
import {ProductImageCategoryEntity} from "../models/category/category_image.entity";
import {Tag} from "../models/tag/tag.entity";
import {ProductImageTagEntity} from "../models/tag/tag_image.entity";
import {TagController} from "../controllers/tag.controller copy";
import {TagService} from "../services/tag.service";




@Module({
    imports:[TypeOrmModule.forFeature([Product,Category,ImageEntity,ProductImageCategoryEntity,Tag,ProductImageTagEntity])],
    controllers:[ProductController,CategoryController,TagController],
    providers:[ProductService,CategoryService,ImageService,TagService],
})
export class ProductModule {}
