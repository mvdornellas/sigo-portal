import { BaseResponse } from './../../_shared/services/base.service.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export type StandardModel = {
    id: string
    name: string
};

@Injectable()
export class StandardService {
    constructor(private client: HttpClient) {}
    async getAll(): Promise<StandardModel[]> {
        const { data, success } = await this.client.get<BaseResponse<StandardModel[]>>(`/standards`).toPromise();
        return data;
    }
}
