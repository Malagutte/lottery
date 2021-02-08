import { GameDto } from 'src/dto/game.dto';

export default class SearchResponseDto {
  page: number;
  amount: number;
  games: GameDto[];
}
