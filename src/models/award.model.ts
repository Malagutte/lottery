import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Game } from "./game.model"

@Entity({ name: "awd_award" })
export class Award {

    @PrimaryColumn('uuid', { generated: 'uuid', name: "awd_id" })
    id: string

    @Column({ name: "awd_hits" })
    hits: number

    @Column({ name: "awd_money_value", type: "decimal", precision: 20, scale: 2 })
    moneyValue: number

    @Column({ name: "awd_total_winners" })
    totalWinners: number

    @ManyToOne(() => Game, entity => entity.awards, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: "gme_id" })
    game: Game

}