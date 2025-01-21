import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { PlaceBidResponseDto } from './dto/place-bid-response.dto';
import { BidGateway } from 'src/gateway/bid.gateway';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bidGateway: BidGateway,
  ) {}

  async placeBid(
    userId: number,
    itemId: number,
    amount: number,
  ): Promise<PlaceBidResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const item = await this.itemRepository.findOne({ where: { id: itemId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    // Ensure the auction is still ongoing
    const currentTime = new Date().getTime();
    const auctionEndTime =
      new Date(item.createdAt).getTime() + item.duration * 1000;
    if (currentTime > auctionEndTime) {
      throw new ForbiddenException('Auction has ended');
    }

    // Fetch the current highest bid for the item from Bid table
    const highestBid = await this.bidRepository
      .createQueryBuilder('bid')
      .where('bid.itemId = :itemId', { itemId })
      .orderBy('bid.amount', 'DESC')
      .getOne();

    // Ensure the bid is higher than the current highest bid
    if (
      (highestBid && amount <= highestBid.amount) ||
      amount < item.startingPrice
    ) {
      throw new ForbiddenException(
        'Bid must be higher than the current highest bid',
      );
    }

    // Create and save the bid
    const bid = this.bidRepository.create({
      amount,
      user,
      item,
    });

    await this.bidRepository.save(bid);

    // Notify clients of the new highest bid
    this.bidGateway.broadcastHighestBid(itemId, bid.amount);

    return {
      message: 'Bid placed successfully',
      amount: bid.amount,
    };
  }
}
