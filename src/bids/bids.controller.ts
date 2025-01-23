import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BidsService } from './bids.service';
import { Bid } from './entities/bid.entity';
import { PlaceBidResponseDto } from './dto/place-bid-response.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBidDto } from './dto/create-bid.dto';

@ApiTags('bids')
@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post(':itemId')
  @ApiOperation({ summary: 'Make user bid' })
  @ApiBody({
    description: 'Make a id for user',
    type: CreateBidDto,
  })
  async placeBid(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body('userId', ParseIntPipe) userId: number,
    @Body('amount') amount: number,
  ): Promise<PlaceBidResponseDto> {
    return this.bidsService.placeBid(userId, itemId, amount);
  }
}
