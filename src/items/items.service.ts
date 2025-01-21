import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { Bid } from 'src/bids/entities/bid.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,
  ) {}

  async createItem(data: Partial<Item>): Promise<Item> {
    // const item = this.itemRepository.create(data);
    const item = this.itemRepository.create({
      ...data,
      createdAt: new Date().toISOString(), // Ensure UTC time
    });
    return this.itemRepository.save(item);
  }

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async getItemById(id: number): Promise<Item> {
    const currentDate = new Date();

    // Fetch the item details
    const item = await this.itemRepository.findOne({ where: { id } });

    // Fetch the highest bid for this item
    const highestBid = await this.bidRepository
      .createQueryBuilder('bid')
      .leftJoinAndSelect('bid.item', 'item')
      .where('item.id = :id', { id })
      .orderBy('bid.amount', 'DESC')
      .getOne();

    const remainingTime =
      (new Date(item.createdAt).getTime() +
        item.duration * 1000 -
        currentDate.getTime()) /
      1000;

    if (item && highestBid) {
      item['highestBid'] = highestBid.amount;
    }

    item['duration'] = Math.max(0, Math.floor(remainingTime));

    return item;
  }

  async getAvailableItems(): Promise<any[]> {
    const currentDate = new Date();

    // Fetch all items that are still available for auction
    const availableItems = await this.itemRepository
      .createQueryBuilder('item')
      .where(
        "(item.createdAt + item.duration * INTERVAL '1 second') > :currentDate",
        { currentDate },
      )
      .getMany();

    // Process each item to attach highest bid and remaining time
    const itemsWithDetails = await Promise.all(
      availableItems.map(async (item) => {
        // Fetch the highest bid for the current item
        const highestBid = await this.bidRepository
          .createQueryBuilder('bid')
          .leftJoin('bid.item', 'item')
          .where('item.id = :id', { id: item.id })
          .orderBy('bid.amount', 'DESC')
          .getOne();

        // Calculate remaining time in minutes
        const remainingTime =
          (new Date(item.createdAt).getTime() +
            item.duration * 1000 -
            currentDate.getTime()) /
          60000;

        return {
          id: item.id,
          name: item.name,
          description: item.description,
          startingPrice: item.startingPrice,
          currentHighestBid: highestBid ? highestBid.amount : 0,
          remainingTime: Math.max(0, Math.floor(remainingTime)),
        };
      }),
    );

    return itemsWithDetails;
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
