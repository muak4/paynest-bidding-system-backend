import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() data: Partial<Item>): Promise<Item> {
    return this.itemsService.createItem(data);
  }

  @Get()
  async getAllItems(): Promise<Item[]> {
    return this.itemsService.getAllItems();
  }

  @Get('available')
  async getAvailableItems() {
    return this.itemsService.getAvailableItems();
  }

  @Get(':id')
  async getItemById(@Param('id') id: number): Promise<Item> {
    const item = this.itemsService.getItemById(id);
    return item;
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }
}
