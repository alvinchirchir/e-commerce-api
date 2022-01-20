import { ApiProperty } from '@nestjs/swagger';
import {CategoryDto} from '../category/category.dto'
import  {TagDto} from '../tag/tag.dto'


export class ImageProductDto {

  @ApiProperty({ type: String })
  image_url: string;

  @ApiProperty({ type: String })
  thumbnail_url: string;

  @ApiProperty({ type: String })
  alt: string;
}


export class ProductDto {
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

  @ApiProperty({ type: ()=>[ImageProductDto] })
  images: ImageProductDto[];
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

  @ApiProperty({ type: Boolean })
  active: boolean;
  @ApiProperty({ type: Number })
  price: number;
  @ApiProperty({ type: ()=>[CategoryDto] })
  categories: CategoryDto[];

  @ApiProperty({ type: ()=>[TagDto] })
  tags: TagDto[];
  @ApiProperty({ type: ()=>[ImageProductDto] })
  images: ImageProductDto[];

  @ApiProperty({ type: Date })
  date_created: Date;
  @ApiProperty({ type: Date })
  date_modified: Date;
 
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
