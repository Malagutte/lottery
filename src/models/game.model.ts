import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Award } from "./award.model"
import { GameNumber } from "./gameNumber.model"

@Entity({ name: "gme_game" })
export class Game {

    @PrimaryColumn('uuid', { generated: 'uuid', name: "gme_id" })
    id: string

    @Column({ name: "gme_type", nullable: false })
    type: string

    @Column({ name: "gme_number", nullable: false })
    number: number

    @Column({ name: "gme_date", nullable: false })
    date: Date

    @OneToMany(() => Award, entity => entity.game, { cascade: ['insert', 'update'] })
    awards: Award[]

    @OneToMany(() => GameNumber, entity => entity.game, { cascade: ['insert', 'update'] })
    numbers: GameNumber[]

}