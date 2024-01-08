import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CaixaRequest, CaixaResponse } from './type.d';

@Injectable()
export class WebRequestService {

    constructor(private readonly httpService: HttpService) { }

    async getGameResultByTypeAndNumber({ type, number }: CaixaRequest) {
        const urlPath = `/:type/:number`
            .replace(':type', type)
            .replace('/:number', number ? `/${number}` : '');

        const request = this.httpService.get<CaixaResponse>(urlPath).pipe();
        const { data } = await firstValueFrom(request);

        return data;
    }
}
