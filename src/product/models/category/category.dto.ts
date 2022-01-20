import { ApiProperty } from '@nestjs/swagger';
import { ProductImageCategoryEntity } from './category_image.entity';

export class ImageCategoryDto {

  @ApiProperty({ type: String })
  image_url: string;

  @ApiProperty({ type: String })
  thumbnail_url: string;

  @ApiProperty({ type: String })
  alt: string;
}

export class CategoryDto {
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    desc: string;
    @ApiProperty({ type: Boolean })
    active: boolean;
    @ApiProperty({ type: ()=>[ImageCategoryDto]})
    images: ImageCategoryDto[];
  }



  export class SingleCategoryDto {

    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    desc: string;
    @ApiProperty({ type: Boolean })
    active: boolean;
    @ApiProperty({ type: ()=>[ImageCategoryDto]})
    images: ImageCategoryDto[];
    @ApiProperty({ type: Date })
    date_created: Date;
    @ApiProperty({ type: Date })
    date_modified: Date;
  }

  export class SingleCategoryProductDto {
    @ApiProperty({ type: String })
    id: string;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    desc: string;
    @ApiProperty({ type: Boolean })
    active: boolean;
    @ApiProperty({ type: String })
    images: object[];
    @ApiProperty({ type: [Object] })
    products: object[];
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
  