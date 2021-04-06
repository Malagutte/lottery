import { parse } from 'date-fns';
import { GameDto } from '../dto/game.dto';
import { Award } from '../models/award.model';
import { Game, GameDocument } from '../models/game.model';

export const modelToDto = (game: GameDocument) => {
  const dto: GameDto = new GameDto();

  dto.number = game.number;
  dto.id = game._id.toString();
  dto.date = game.date;
  dto.type = game.type;
  dto.numbers = game.numbers.map((num) => Number(num));
  return dto;
};

export const responseToModel = (game: any) => {
  const gameModel = new Game();
  const resultNumbers = game.listaDezenas;
  const gameNumbers: number[] = resultNumbers.map(n => Number(n));

  gameModel.numbers = gameNumbers;
  gameModel.number = game.numero;
  gameModel.date = parse(game.dataApuracao, 'dd/MM/yyyy', new Date()).toISOString();

  return gameModel;
};
