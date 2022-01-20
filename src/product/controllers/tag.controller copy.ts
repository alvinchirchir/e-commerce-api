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
import { ProductResponseDto } from '../models/product/product.dto';
import { TagDto, SingleTagDto, Status } from '../models/tag/tag.dto';

import { TagService } from '../services/tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  //CREATE
  @Post()
  @ApiCreatedResponse({
    description: 'Create success',
    type: SingleTagDto,
  })
  @ApiNotAcceptableResponse({
    description: 'Create Fail',
    type:Status ,
  })
  @ApiBody({ type: TagDto })
  createTag(@Body() body):Promise<SingleTagDto> {
    return this.tagService.createTag(body);
  }

  //READ
  @Get()
  @ApiOkResponse({
    description: 'Get success',
    type: [SingleTagDto],
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getTags(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<SingleTagDto[]> {
    return this.tagService.getTags(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get success',
    type: SingleTagDto,
  })
  @ApiNotFoundResponse({
    description: 'Get Fail',
    type: Status,
  })
  getTagByTagId(@Param('id', new ParseUUIDPipe()) id: string):Promise<SingleTagDto> {
    return this.tagService.getTagByTagId(id);
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
  getProductsByTagId(@Param('id', new ParseUUIDPipe()) id: string,
  @Query('page') page: number,
  @Query('limit') limit: number):Promise<ProductResponseDto[]> {
    return this.tagService.getProductsByTagId(page, limit,id);
  }


  //UPDATE
  @Put(':tag_id')
  @ApiOkResponse({
    description: 'Update success',
    type: SingleTagDto,
  })
  @ApiConflictResponse({
    description: 'Update Fail',
    type: Status,
  })
  @ApiBody({ type: TagDto })
  updateTag(
    @Param('tag_id', new ParseUUIDPipe()) tag_id: string,
    @Body() body,
  ):Promise<SingleTagDto> {
    return this.tagService.updateTag(tag_id, body);
  }


    //DELETE
    @Delete(':tag_id')
    @ApiOkResponse({
      description: 'Delete success',
      type: Status,
    })
    @ApiNotAcceptableResponse({
      description: 'Delete Fail',
      type: Status,
    })
    deleteTag(@Param('tag_id', new ParseUUIDPipe()) tag_id: string):Promise<Status> {
      return this.tagService.deleteTag(tag_id);
    }
}
