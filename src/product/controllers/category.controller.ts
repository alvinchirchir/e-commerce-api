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
import { CreateCategoryDto, SingleCategoryDto, Status } from '../models/category/category.dto';
import { ProductResponseDto } from '../models/product/product.dto';

import { CategoryService } from '../services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //CREATE
  @Post()
  @ApiCreatedResponse({
    description: 'Create success',
    type: SingleCategoryDto,
  })
  @ApiNotAcceptableResponse({
    description: 'Create Fail',
    type:Status ,
  })
  @ApiBody({ type: CreateCategoryDto })
  createCategory(@Body() body):Promise<SingleCategoryDto> {
    return this.categoryService.createCategory(body);
  }

  //READ
  @Get()
  @ApiOkResponse({
    description: 'Get success',
    type: [SingleCategoryDto],
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getCategories(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<SingleCategoryDto[]> {
    return this.categoryService.getCategories(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get success',
    type: SingleCategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getCategoryByCategoryId(@Param('id', new ParseUUIDPipe()) id: string):Promise<SingleCategoryDto> {
    return this.categoryService.getCategoryByCategoryId(id);
  }

  @Get(':id/products')
  @ApiOkResponse({
    description: 'Get success',
    type: [ProductResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getProductsByCategoryId(@Param('id', new ParseUUIDPipe()) id: string,
  @Query('page') page: number,
  @Query('limit') limit: number):Promise<ProductResponseDto[]> {
    return this.categoryService.getProductsByCategoryId(page, limit,id);
  }


  //UPDATE
  @Put(':category_id')
  @ApiOkResponse({
    description: 'Update success',
    type: SingleCategoryDto,
  })
  @ApiConflictResponse({
    description: 'Update Fail',
    type: Status,
  })
  updateCategory(
    @Param('category_id', new ParseUUIDPipe()) category_id: string,
    @Body() body,
  ):Promise<SingleCategoryDto> {
    return this.categoryService.updateCategory(category_id, body);
  }


    //DELETE
    @Delete(':category_id')
    @ApiOkResponse({
      description: 'Delete success',
      type: Status,
    })
    @ApiNotAcceptableResponse({
      description: 'Delete Fail',
      type: Status,
    })
    deleteCategory(@Param('category_id', new ParseUUIDPipe()) category_id: string):Promise<Status> {
      return this.categoryService.deleteCategory(category_id);
    }
}
