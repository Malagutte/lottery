import { HttpStatus, INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import * as request from 'supertest';
import { closeInMongodConnection, rootMongooseTestModule } from '../config/mongose.mock.config';
import { TaskSchema } from '../models/task.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskModule', () => {
    let app: INestApplication;
    let service: TaskService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ rootMongooseTestModule(),
            MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
            providers: [TaskService],
            controllers: [TaskController]
        }).compile()

        app = moduleRef.createNestApplication()
        service = moduleRef.get<TaskService>(TaskService)

        await app.init();
    });

    afterAll(async () => {
        await closeInMongodConnection();
    });



    it('when search task and not found should return 204', async () => {

        return request(app.getHttpServer())
            .get(`/api/v1/task/${new ObjectId().toHexString()}`)
            .expect(HttpStatus.NO_CONTENT)

    });

});