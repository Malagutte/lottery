import { HttpStatus, INestApplication } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { Game, GameSchema } from '../models/game.model'
import { TaskSchema } from '../models/task.model'
import { closeInMongodConnection, rootMongooseTestModule } from '../config/mongose.mock.config'
import { GameController } from './game.controller'
import { GameService } from './game.service'
import * as request from 'supertest';
import Search from './dto/request/search.request'
import { ObjectId } from 'mongodb'
import { modelToDto, responseToModel } from '../serialization/game.serialization'
import { GameDto } from '../dto/game.dto'
import { TaskDto } from '../dto/task.dto'


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
            return request(app.getHttpServer())
                .get("/api/v1/game/megasena/1")
                .expect(HttpStatus.NO_CONTENT)
        })


        it("when try update information about games", async () => {
            return request(app.getHttpServer())
                .post("/api/v1/game/update")
                .expect(HttpStatus.ACCEPTED)
        })

        it("when search with valid request should return 200", async () => {

            const objRequest = new Search()
            objRequest.amount = 10
            objRequest.order = "DESC"
            objRequest.types = ["MEGASENA"]
            return request(app.getHttpServer())
                .post("/api/v1/game/search")
                .send(objRequest)
                .expect(HttpStatus.OK)
        })

        it("when try to get game exists in base should return data and status code 200", async () => {

            jest.spyOn(service, 'getGameByTypeAndNumber').mockResolvedValue(newDocument())
            return request(app.getHttpServer())
                .get("/api/v1/game/MEGASENA/2021")
                .expect(HttpStatus.OK)
        })
    })

    describe("serialization", () => {

        it('when try to convert Document to DTO should be sucess', async () => {
            expect(modelToDto(newDocument())).toBeInstanceOf(GameDto)
        })

        it('when try to convert Response to Document should be sucess', async () => {
            expect(responseToModel({
                listaDezenas: [10, 20, 30],
                listaRateioPremio: [{ descricaoFaixa: "6" }]
            })).toBeInstanceOf(Game)
        })
    })

    function newDocument() {
        return {
            $isDefault: null, $ignore: null, $isDeleted: null, $isEmpty: null, $isValid: null,
            $locals: null, $markValid: null, $op: null, $session: null, $set: null, $where: null,
            collection: null, db: null, delete: null, deleteOne: null, depopulate: null, directModifiedPaths: null,
            equals: null, execPopulate: null, get: null, getChanges: null, increment: null, init: null, invalidate: null,
            isDirectModified: null, isDirectSelected: null, isInit: null, isModified: null, isNew: null, isSelected: null,
            markModified: null, model: null, modelName: null, modifiedPaths: null, overwrite: null, populate: null,
            populated: null, remove: null, replaceOne: null, save: null, schema: null, set: null, toJSON: null,
            toObject: null, unmarkModified: null, update: null, updateOne: null, validate: null, validateSync: null,
            isClosed: false, id: new ObjectId().toHexString(), type: "MEGASENA", number: 2000, date: new Date(), numbers: [1, 2, 3, 4]
            , awards: null
        };
    }
})