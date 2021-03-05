import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameRequestDocument = GameRequest & Document;

@Schema({ versionKey: "version" })
export class GameRequest {

    @Prop()
    type: string

    @Prop()
    urlParameters: string


    constructor(type: string, urlParameters: string) {
        this.type = type
        this.urlParameters = urlParameters
    }

}

export const GameRequestSchema = SchemaFactory.createForClass(GameRequest);