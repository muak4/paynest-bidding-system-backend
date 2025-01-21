import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { EpisodesService } from './episodes.service';
import { AdminGuard } from 'src/admin/admin.guard';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodeService: EpisodesService) {}

  @Get()
  findAll(@Query('studio') studio: 'HBO' | 'CBS') {
    console.log(studio);
    // const service = new EpisodesService();
    return this.episodeService.getEpisodes(studio);
  }

  @Get('featured')
  findFeatured() {
    return 'featured episodes';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.episodeService.getEpisode(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body(new ValidationPipe()) createEpisodeDto: CreateEpisodeDto) {
    console.log(createEpisodeDto);
    return this.episodeService.createEpisode(createEpisodeDto);
  }

  @Put(':id')
  updateEpisode(
    @Param('id') id: string,
    @Body() updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return this.episodeService.updateEpisode(+id, updateEpisodeDto);
  }

  @Delete(':id')
  removeEpisode(@Param('id') id: string) {
    return this.episodeService.removeEpisode(+id);
  }
}
