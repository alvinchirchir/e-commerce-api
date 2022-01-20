import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Body,
  ParseUUIDPipe,
  Query,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateProductDto, ProductResponseDto, Status } from '../models/product/product.dto';

import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //CREATE
  @Post()
  @ApiCreatedResponse({
    description: 'Create success',
    type: ProductResponseDto,
  })
  @ApiNotAcceptableResponse({
    description: 'Create Fail',
    type:Status ,
  })
  @ApiBody({ type: CreateProductDto })
  createProduct(@Body() body):Promise<ProductResponseDto> {
    return this.productService.createProduct(body);
  }

  //READ
  //READ
  @Get()
  @ApiOkResponse({
    description: 'Get success',
    type: [ProductResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ProductResponseDto[]> {
    return this.productService.getProducts(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get success',
    type: ProductResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getProductByProductId(@Param('id', new ParseUUIDPipe()) id: string):Promise<ProductResponseDto> {
    return this.productService.getProductByProductId(id);
  }


  

  //UPDATE
  @Put(':product_id')
  @ApiOkResponse({
    description: 'Update success',
    type: ProductResponseDto,
  })
  @ApiConflictResponse({
    description: 'Update Fail',
    type: Status,
  })
  updateProduct(
    @Param('product_id', new ParseUUIDPipe()) product_id: string,
    @Body() body,
  ):Promise<ProductResponseDto> {
    return this.productService.updateProduct(product_id, body);
  }
  //DELETE
  @Delete(':product_id')
  @ApiOkResponse({
    description: 'Delete success',
    type: Status,
  })
  @ApiNotAcceptableResponse({
    description: 'Delete Fail',
    type: Status,
  })
  deleteProduct(@Param('product_id', new ParseUUIDPipe()) product_id: string):Promise<Status> {
    return this.productService.deleteProduct(product_id);
  }
}
