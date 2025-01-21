import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { BidGateway } from 'src/gateway/bid.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Bid, Item, User])],
  controllers: [BidsController],
  providers: [BidsService, BidGateway],
})
export class BidsModule {}
