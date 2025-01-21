import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  private episodes = [
    { id: 0, name: 'GOT', studio: 'HBO' },
    { id: 1, name: 'The Blacklist', studio: 'CBS' },
  ];

  getEpisodes(studio?: 'HBO' | 'CBS') {
    if (studio) {
      return this.episodes.filter((ep) => ep.studio === studio);
    }

    return this.episodes;
  }

  getEpisode(id: Number) {
    const episode = this.episodes.find((ep) => ep.id === id);

    if (!episode) {
      throw new Error('Episode not found');
    }

    return episode;
  }

  createEpisode(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = {
      ...createEpisodeDto,
      id: Date.now(),
    };
    this.episodes.push(newEpisode);
    return newEpisode;
  }

  updateEpisode(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    this.episodes = this.episodes.map((ep) => {
      if (ep.id === id) {
        return { ...ep, ...updateEpisodeDto };
      }
      return ep;
    });
    return this.getEpisode(id);
  }

  removeEpisode(id: number) {
    const toBeRemoved = this.getEpisode(id);

    this.episodes = this.episodes.filter((ep) => ep.id != id);

    return toBeRemoved;
  }
}
