import { HttpStatus, INestApplication } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { GameSchema } from '../models/game.model'
import { TaskSchema } from '../models/task.model'
import { closeInMongodConnection, rootMongooseTestModule } from '../config/mongose.mock.config'
import { GameController } from './game.controller'
import { GameService } from './game.service'
import * as request from 'supertest';


describe('GameModule', () => {
    let app: INestApplication
    let service: GameService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }]),
                MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])
            ],
            providers: [GameService],
            controllers: [GameController],
        }).compile()

        service = moduleRef.get<GameService>(GameService)
        app = moduleRef.createNestApplication()

        await app.init()
    })

    afterAll(async () => {
        await closeInMongodConnection()
        app.close()
    })



    describe("controller", () => {
        it("when try to get game and not found should return code 204", async () => {
            request(app.getHttpServer())
                .get("/api/v1/game/megasena/1")
                .expect(HttpStatus.NO_CONTENT)
        })
    })
})