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
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateAttributeTypeDto,
  SingleAttributeTypeDto,
  Status,
} from '../models/attribute/attribute_type.dto';
import { ProductResponseDto } from '../models/product/product.dto';

import { AttributeTypeService } from '../services/attribute_type.service';

@Controller('attribute-types')
export class AttributeTypeController {
  constructor(private readonly attributeTypeService: AttributeTypeService) {}

  //CREATE
  @Post()
  @ApiCreatedResponse({
    description: 'Create success',
    type: SingleAttributeTypeDto,
  })
  @ApiNotAcceptableResponse({
    description: 'Create Fail',
    type: Status,
  })
  @ApiBody({ type: CreateAttributeTypeDto })
  createAttributeType(@Body() body): Promise<SingleAttributeTypeDto> {
    return this.attributeTypeService.createAttributeType(body);
  }

  //READ
  @Get()
  @ApiOkResponse({
    description: 'Get success',
    type: [SingleAttributeTypeDto],
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getAttributeTypes(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<SingleAttributeTypeDto[]> {
    return this.attributeTypeService.getAttributeTypes(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get success',
    type: SingleAttributeTypeDto,
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getAttributeTypeByAttributeTypeId(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<SingleAttributeTypeDto> {
    return this.attributeTypeService.getAttributeTypeByAttributeTypeId(id);
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
  getProductsByAttributeTypeId(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ProductResponseDto[]> {
    return this.attributeTypeService.getProductsByAttributeTypeId(
      page,
      limit,
      id,
    );
  }

  //UPDATE
  @Put(':attribute_type_id')
  @ApiOkResponse({
    description: 'Update success',
    type: SingleAttributeTypeDto,
  })
  @ApiConflictResponse({
    description: 'Update Fail',
    type: Status,
  })
  updateAttributeType(
    @Param('attribute_type_id', new ParseUUIDPipe()) attribute_type_id: string,
    @Body() body,
  ): Promise<SingleAttributeTypeDto> {
    return this.attributeTypeService.updateAttributeType(
      attribute_type_id,
      body,
    );
  }

  //DELETE
  @Delete(':attribute_type_id')
  @ApiOkResponse({
    description: 'Delete success',
    type: Status,
  })
  @ApiNotAcceptableResponse({
    description: 'Delete Fail',
    type: Status,
  })
  deleteAttributeType(
    @Param('attribute_type_id', new ParseUUIDPipe()) attribute_type_id: string,
  ): Promise<Status> {
    return this.attributeTypeService.deleteAttributeType(attribute_type_id);
  }
}
