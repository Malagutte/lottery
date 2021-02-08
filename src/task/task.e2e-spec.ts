import { HttpStatus, INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import * as request from 'supertest';
import { closeInMongodConnection, rootMongooseTestModule } from '../config/mongose.mock.config';
import { TaskSchema } from '../models/task.model';
import { modelToDto } from '../serialization/task.serialization';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskModule', () => {
  let app: INestApplication;
  let service: TaskService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [rootMongooseTestModule(),
      MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
      providers: [TaskService],
      controllers: [TaskController]
    }).compile()

    service = moduleRef.get<TaskService>(TaskService)
    app = moduleRef.createNestApplication()

    await app.init();
  });

  afterAll(async () => {

    await closeInMongodConnection();
    app.close()
  });


  describe("controller", () => {

    it('when search task and not found should return 204', async () => {

      return request(app.getHttpServer())
        .get(`/api/v1/task/${new ObjectId().toHexString()}`)
        .expect(HttpStatus.NO_CONTENT)

    });

    it('when search task and exist should return 200', async () => {

      const taskId = new ObjectId().toHexString();
      const now = new Date()



      jest.spyOn(service, `getTask`).mockResolvedValue({
        $isDefault: null, $ignore: null, $isDeleted: null, $isEmpty: null, $isValid: null, $locals: null, $markValid: null, $op: null, $session: null, $set: null, $where: null,
        collection: null, db: null, delete: null, deleteOne: null, depopulate: null, directModifiedPaths: null, equals: null, execPopulate: null,
        get: null, getChanges: null, increment: null, init: null, invalidate: null, isDirectModified: null, isDirectSelected: null, isInit: null,
        isModified: null, isNew: null, isSelected: null, markModified: null, model: null, modelName: null, modifiedPaths: null, overwrite: null,
        populate: null, populated: null, remove: null, replaceOne: null, save: null, schema: null, set: null, toJSON: null, toObject: null, unmarkModified: null,
        update: null, updateOne: null, validate: null, validateSync: null,
        isClosed: false, initDate: now, endDate: null, id: taskId

      })

      request(app.getHttpServer())
        .get(`/api/v1/task/${taskId}`)
        .expect(HttpStatus.OK)
        .expect({
          id: taskId,
          initDate: now.toISOString()
        })

    });

  })

  describe("serialization", () => {

    it('when serialize valid object should return casted object', async () => {
      const now = new Date()
      const taskId = new ObjectId().toHexString()
      const dto = modelToDto({
        $isDefault: null, $ignore: null, $isDeleted: null, $isEmpty: null, $isValid: null, $locals: null, $markValid: null, $op: null, $session: null, $set: null, $where: null,
        collection: null, db: null, delete: null, deleteOne: null, depopulate: null, directModifiedPaths: null, equals: null, execPopulate: null,
        get: null, getChanges: null, increment: null, init: null, invalidate: null, isDirectModified: null, isDirectSelected: null, isInit: null,
        isModified: null, isNew: null, isSelected: null, markModified: null, model: null, modelName: null, modifiedPaths: null, overwrite: null,
        populate: null, populated: null, remove: null, replaceOne: null, save: null, schema: null, set: null, toJSON: null, toObject: null, unmarkModified: null,
        update: null, updateOne: null, validate: null, validateSync: null,
        isClosed: false, initDate: now, endDate: null, id: taskId

      })

      expect(dto.id).toBe(taskId)
      expect(dto.initDate).toBe(now)

    });

  })

});