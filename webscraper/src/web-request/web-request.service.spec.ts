import { Test, TestingModule } from '@nestjs/testing';
import { WebRequestService } from './web-request.service';

describe('WebRequestService', () => {
  let service: WebRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebRequestService],
    }).compile();

    service = module.get<WebRequestService>(WebRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
