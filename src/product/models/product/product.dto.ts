import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ type: Number })
  discount_price: number;
  @ApiProperty({ type: String })
  discount_id: string;
  @ApiProperty({ type: String })
  category_ids: string;
  @ApiProperty({ type: String })
  attribute_type_ids: string;
  @ApiProperty({ type: String })
  tag_ids: string;
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
  code: string;
  @ApiProperty({ type: String })
  desc: string;
  @ApiProperty({ type: String })
  SKU: string;
  @ApiProperty({ type: Boolean })
  active: boolean;
  @ApiProperty({ type: Number })
  price: number;
  @ApiProperty({ type: Number })
  discount_price: number;
  @ApiProperty({ type: Object })
  discount: object;
  @ApiProperty({ type: Object })
  inventory: object;
  @ApiProperty({ type: Object })
  categories: object[];
  @ApiProperty({ type: String })
  images: object[];
  @ApiProperty({ type: String })
  attribute_types: object[];
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
