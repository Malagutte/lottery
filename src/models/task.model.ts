import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'tsk_task' })
export class Task {

    @PrimaryColumn('uuid', { generated: 'uuid' ,name:"tsk_id"})
    id: string

    @Column({ name: "tsk_is_closed", default: false })
    isClosed: boolean

    @Column({ name: "tsk_init_date", nullable: false })
    initDate: Date

    @Column({ name: "tsk_end_date", nullable: true })
    endDate: Date
}