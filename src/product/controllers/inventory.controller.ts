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
  
  import { InventoryService } from '../services/inventory.service';
  
  @Controller('inventories')
  export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}
  
    //CREATE
    @Post()
    createProductInventory(@Body() body) {
      return this.inventoryService.createProductInventory(body);
    }
  
    //READ
    @Get()
    getInventories(
      @Query('page') page: number,
      @Query('limit') limit: number,
    ): Promise<object[]> {
      return this.inventoryService.getInventories(page, limit);
    }
  
    @Get(':id')
    getInventoryByInventoryId(@Param('id', new ParseUUIDPipe()) id: string) {
      return this.inventoryService.getInventoryByInventoryId(id);
    }
  }
  