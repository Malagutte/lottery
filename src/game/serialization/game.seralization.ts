import { Award } from "src/models/award.model";
import { Game } from "src/models/game.model";
import { GameNumber } from "src/models/gameNumber.model";
import AwardDto from "../../dto/award.dto";
import { GameDto } from "../../dto/game.dto";
import { v4 as uuid } from 'uuid';
import { parse } from 'date-fns'

export const modelToDto = (game: Game) => {
    let dto: GameDto = new GameDto()

    dto.gameNumber = game.number
    dto.id = game.id
    dto.date = game.date
    dto.numbers = game.numbers.map(number => number.value).sort((a, b) => a - b)
    dto.awards = game.awards.map(award => Object.assign(new AwardDto(), award)).sort((a, b) => a.hits + b.hits)

    return dto
}


export const responseToModel = (game: any) => {
    const gameModel = new Game()
    const resultNumbers = game.listaDezenas
    const gameNumbers: GameNumber[] = resultNumbers.map(number => {
        const gameNumber = new GameNumber()
        gameNumber.value = number
        gameNumber.id = uuid()
        return gameNumber
    })

    const awards: Award[] = game.listaRateioPremio.map(premio => {
        const award = new Award()
        const hits = Number(premio.descricaoFaixa.split(" ")[0])
        award.moneyValue = premio.valorPremio
        award.totalWinners = premio.numeroDeGanhadores
        award.hits = hits
        award.id = uuid()
        return award

    })

    gameModel.numbers = gameNumbers
    gameModel.awards = awards
    gameModel.id = uuid()
    gameModel.number = game.numero
    gameModel.date = parse(game.dataApuracao, 'dd/MM/yyyy', new Date())

    return gameModel;

}
