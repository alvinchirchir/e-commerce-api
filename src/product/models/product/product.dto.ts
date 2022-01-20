import { ApiProperty } from '@nestjs/swagger';
import {CategoryDto} from '../category/category.dto'
import  {TagDto} from '../tag/tag.dto'


export class CreateProductDto {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  code: string;
  @ApiProperty({ type: String })
  desc: string;
  @ApiProperty({ type: Boolean })
  active: boolean;
  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: ()=>[CategoryDto] })
  categories: CategoryDto;

  @ApiProperty({ type: ()=>[TagDto] })
  tags: TagDto;

  @ApiProperty({ type: String })
  images: object[];
  @ApiProperty({ type: Number })
  quantity: number;
}

export class ProductResponseDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  desc: string;
  @ApiProperty({ type: String })
  SKU: string;
  @ApiProperty({ type: Boolean })
  active: boolean;
  @ApiProperty({ type: Number })
  price: number;
  @ApiProperty({ type: ()=>[CategoryDto] })
  categories: CategoryDto;

  @ApiProperty({ type: ()=>[TagDto] })
  tags: TagDto;
  @ApiProperty({ type: String })
  images: object[];

  @ApiProperty({ type: Date })
  date_created: Date;
  @ApiProperty({ type: Date })
  date_modified: Date;
  @ApiProperty({ type: Date })
  date_deleted: Date;
}

export class Status {
  @ApiProperty({ type: Boolean })
  success: boolean;
  @ApiProperty({ type: Number })
  statusCodeDB: number;
  @ApiProperty({ type: String })
  statusMessage: string;
  @ApiProperty({ type: String })
  timestamp: string;
}
