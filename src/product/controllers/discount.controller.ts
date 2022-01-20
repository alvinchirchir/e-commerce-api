import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Body,ParseUUIDPipe,Query,Param} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateDiscountDto, SingleDiscountDto, Status } from '../models/discount/discount.dto';
import { ProductResponseDto } from '../models/product/product.dto';

import { DiscountService } from '../services/discount.service';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  //CREATE
  @Post()
  @ApiCreatedResponse({
    description: 'Create success',
    type: SingleDiscountDto,
  })
  @ApiNotAcceptableResponse({
    description: 'Create Fail',
    type:Status ,
  })
  @ApiBody({ type: CreateDiscountDto })
  createDiscount(@Body() body):Promise<SingleDiscountDto> {
    return this.discountService.createDiscount(body);
  }

  //READ
  @Get()
  @ApiOkResponse({
    description: 'Get success',
    type: [SingleDiscountDto],
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getDiscounts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<SingleDiscountDto[]> {
    return this.discountService.getDiscounts(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get success',
    type: SingleDiscountDto,
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getDiscountByDiscountId(@Param('id', new ParseUUIDPipe()) id: string):Promise<SingleDiscountDto> {
    return this.discountService.getDiscountByDiscountId(id);
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
  getProductsByDiscountId(@Param('id', new ParseUUIDPipe()) id: string,
  @Query('page') page: number,
  @Query('limit') limit: number):Promise<ProductResponseDto[]> {
    return this.discountService.getProductsByDiscountId(page, limit,id);
  }

  //UPDATE
  @Put(':discount_id')
  @ApiOkResponse({
    description: 'Update success',
    type: SingleDiscountDto,
  })
  @ApiConflictResponse({
    description: 'Update Fail',
    type: Status,
  })
  updateProduct(
    @Param('discount_id', new ParseUUIDPipe()) discount_id: string,
    @Body() body,
  ): Promise<SingleDiscountDto> {
    return this.discountService.updateDiscount(discount_id, body);
  }

  //DELETE
  @Delete(':discount_id')
  @ApiOkResponse({
    description: 'Delete success',
    type: Status,
  })
  @ApiNotAcceptableResponse({
    description: 'Delete Fail',
    type: Status,
  })
  deleteProduct(@Param('discount_id', new ParseUUIDPipe()) discount_id: string):Promise<Status> {
    return this.discountService.deleteDiscount(discount_id);
  }
}
