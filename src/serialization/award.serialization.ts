import AwardDto from "src/dto/award.dto";
import { Game } from "src/models/game.model";
import { Award, AwardDocument } from "../models/award.model";

export const responseToModel = (listaRateioPremio: any, game_id: any) : Award [] => {

    return listaRateioPremio.map((premio) => {
        const award = new Award();
        const hits = premio.descricaoFaixa != null ? Number(premio.descricaoFaixa.split(' ')[0]) : null;
        award.money_value = Number(premio.valorPremio);
        award.total_winners = Number(premio.numeroDeGanhadores);
        award.hits = hits;
        award.game_id = game_id
        return award;
    });

}


export const modelToDto = (award : AwardDocument) => {
    const dto = new AwardDto()
    dto.hits = award.hits
    dto.moneyValue = award.money_value
    dto.totalWinners = award.total_winners

    return dto
}