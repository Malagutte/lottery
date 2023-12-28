export interface CaixaRequest {
    type: string;
    number?: string;
}

export interface CaixaResponse {
    acumulado: boolean;
    concurso: number;
    listaDezenas: Array<string>;
    listaRateioPremio: Array<{
        faixa: number;
        numeroDeGanhadores: number;
        valorPremio: number;
        descricaoFaixa: string;
    }>;
    valorArrecadado: number;
}