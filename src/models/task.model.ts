import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;
@Schema()
export class Task {

    @Prop()
    isClosed: boolean

    @Prop()
    initDate: Date

    @Prop()
    endDate: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task);