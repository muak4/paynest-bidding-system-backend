import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Bid } from 'src/bids/entities/bid.entity';
import { BidGateway } from 'src/gateway/bid.gateway';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Bid, User])],
  providers: [ItemsService, BidGateway],
  controllers: [ItemsController],
})
export class ItemsModule {}
