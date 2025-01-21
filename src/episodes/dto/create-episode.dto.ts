import { IsEnum, MinLength } from 'class-validator';

export class CreateEpisodeDto {
  @MinLength(3)
  name: string;

  @IsEnum(['HBO', 'CBS'], { message: 'Use corect Studio' })
  studio: 'HBO' | 'CBS';
}
