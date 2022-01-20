import { ApiProperty } from '@nestjs/swagger';


export class ImageTagDto {

  @ApiProperty({ type: String })
  image_url: string;

  @ApiProperty({ type: String })
  thumbnail_url: string;

  @ApiProperty({ type: String })
  alt: string;
}

export class TagDto {
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    desc: string;
    @ApiProperty({ type: Boolean })
    active: boolean;
    @ApiProperty({ type: ()=>[ImageTagDto] })
    images: ImageTagDto[];
  }

  export class SingleTagDto {
    @ApiProperty({ type: String })
    id: string;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    desc: string;
    @ApiProperty({ type: Boolean })
    active: boolean;
    @ApiProperty({ type: ()=>[ImageTagDto] })
    images: ImageTagDto[];
    @ApiProperty({ type: Date })
    date_created: Date;
    @ApiProperty({ type: Date })
    date_modified: Date;
  
  }

  export class SingleTagProductDto {
    @ApiProperty({ type: String })
    id: string;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    desc: string;
    @ApiProperty({ type: Boolean })
    active: boolean;
    @ApiProperty({ type: ()=>[ImageTagDto] })
    images: ImageTagDto[];
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
  