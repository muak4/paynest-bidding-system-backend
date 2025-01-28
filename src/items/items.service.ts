import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { Bid } from 'src/bids/entities/bid.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createItem(data: CreateItemDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: data.createdBy },
    });

    if (!user) {
      throw new Error('User not found'); // Handle user not found scenario
    }

    const item = this.itemRepository.create({
      ...data,
      createdAt: new Date(),
      createdBy: user,
    });

    const savedItem = await this.itemRepository.save(item);

    return {
      id: savedItem.id,
      name: savedItem.name,
      description: savedItem.description,
      startingPrice: savedItem.startingPrice,
      duration: savedItem.duration,
      createdAt: savedItem.createdAt,
      createdBy: savedItem.createdBy.id,
    };
  }

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async getItemById(id: number): Promise<any> {
    const currentDate = new Date();

    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

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

    return {
      ...item,
      createdBy: item.createdBy.id,
    };
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
