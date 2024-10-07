import { Test, TestingModule } from '@nestjs/testing';
import { CaixaWebRequestService } from './caixa-web-request.service';

describe('CaixaWebRequestService', () => {
  let service: CaixaWebRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaixaWebRequestService],
    }).compile();

    service = module.get<CaixaWebRequestService>(CaixaWebRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
