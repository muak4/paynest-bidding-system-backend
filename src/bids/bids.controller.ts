import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BidsService } from './bids.service';
import { Bid } from './entities/bid.entity';
import { PlaceBidResponseDto } from './dto/place-bid-response.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post(':itemId')
  async placeBid(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body('userId', ParseIntPipe) userId: number,
    @Body('amount') amount: number,
  ): Promise<PlaceBidResponseDto> {
    return this.bidsService.placeBid(userId, itemId, amount);
  }
}
