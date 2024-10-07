import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CaixaRequest, CaixaResponse } from './type';

@Injectable()
export class CaixaWebRequestService {
  constructor(private readonly httpService: HttpService) {}

  async getGameResultByTypeAndNumber({ type, number }: CaixaRequest) {
    const urlPath = `/${type}${number ? `/${number}` : ''}`;

    const request = this.httpService.get<CaixaResponse>(urlPath).pipe();
    const { data } = await firstValueFrom(request);

    return data;
  }
}
