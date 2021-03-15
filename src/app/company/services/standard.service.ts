import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/_shared/services/base.service.response';
import { CompanyModel } from './company.service';

export type StandardModel = {
    id: string
    name: string,
    rating: number
};

@Injectable()
export class StandardService {
    constructor(private client: HttpClient) {}
    async getAll(companyId: string): Promise<StandardModel[]> {
        const { data, success } = await this.client.get<BaseResponse<StandardModel[]>>(`companies/${companyId}/standards`).toPromise();
        return data;
    }

    async updateAll(companyId: string, standards: StandardModel[]): Promise<StandardModel[]>{
        const { data, success } = await this.client.put<BaseResponse<StandardModel[]>>(`companies/${companyId}/standards`, {
            standards
        }).toPromise();
        return data;
    }
}
