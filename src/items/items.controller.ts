import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new item for auction' })
  @ApiBody({
    description: 'Item data to create a new auction item',
    type: CreateItemDto,
  })
  async createItem(@Body() data: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items in system' })
  async getAllItems(): Promise<Item[]> {
    return this.itemsService.getAllItems();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get only items that are available for auction' })
  async getAvailableItems() {
    return this.itemsService.getAvailableItems();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by Id' })
  async getItemById(@Param('id') id: number): Promise<Item> {
    const item = this.itemsService.getItemById(id);
    return item;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item by Id' })
  async deleteItem(@Param('id') id: number): Promise<void> {
    return this.itemsService.deleteItem(id);
  }
}
