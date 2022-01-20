import { ApiProperty } from '@nestjs/swagger';


export class CreateAttributeTypeDto {
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    desc: string;
    @ApiProperty({ type: Boolean })
    active: boolean;
    @ApiProperty({ type: String })
    attributes: object[];
  }

  export class SingleAttributeTypeDto {
    @ApiProperty({ type: String })
    id: string;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    desc: string;
    @ApiProperty({ type: Boolean })
    active: boolean;

    @ApiProperty({ type: String })
    attributes: object[];
    

    @ApiProperty({ type: Date })
    date_created: Date;
    @ApiProperty({ type: Date })
    date_modified: Date;
    @ApiProperty({ type: Date })
    date_deleted: Date;
  }

  export class SingleAttributeTypeProductDto {
    @ApiProperty({ type: String })
    id: string;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    desc: string;
    @ApiProperty({ type: Boolean })
    active: boolean;

    @ApiProperty({ type: [Object] })
    products: object[];
    @ApiProperty({ type: String })
    attributes: object[];
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
  