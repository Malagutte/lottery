import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Game } from "./game.model"

@Entity({ name: 'gnr_game_number' })
export class GameNumber {

    @PrimaryColumn('uuid', { generated: 'uuid', name: "gnr_id" })
    id: string

    @Column({ name: 'gnr_value', nullable: false })
    value: number

    @ManyToOne(() => Game, entity => entity.numbers, { cascade: ['insert', 'update'] })
    @JoinColumn({ name: "gme_id" })
    game: Game

}