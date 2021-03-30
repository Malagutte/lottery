import { parse } from 'date-fns';
import { Award } from '../models/award.model';
import { Game, GameDocument } from '../models/game.model';
import AwardDto from '../dto/award.dto';
import { GameDto } from '../dto/game.dto';
import { Int32 } from 'bson';

export const modelToDto = (game: GameDocument) => {
  const dto: GameDto = new GameDto();

  dto.number = game.number;
  dto.id = game.id;
  dto.date = game.date;
  dto.type = game.type;
  dto.numbers = game.numbers.map((num) => Number(num));
  dto.awards = game.awards
    ? game.awards.map((award) => Object.assign(new AwardDto(), award))
    : undefined;

  return dto;
};

export const responseToModel = (game: any) => {
  const gameModel = new Game();
  const resultNumbers = game.listaDezenas;
  const gameNumbers: number[] = resultNumbers;

  const awards: Award[] = game.listaRateioPremio.map((premio) => {
    const award = new Award();
    const hits = premio.descricaoFaixa != null ? Number(premio.descricaoFaixa.split(' ')[0]) : null;
    award.moneyValue = premio.valorPremio;
    award.totalWinners = premio.numeroDeGanhadores;
    award.hits = hits;
    return award;
  });

  gameModel.numbers = gameNumbers;
  gameModel.awards = awards;
  gameModel.number = game.numero;
  gameModel.date = parse(game.dataApuracao, 'dd/MM/yyyy', new Date());

  return gameModel;
};
