import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/_shared/services/base.service.response';

export type CompanyModel = {
    id: string
    name: string,
    email: string,
    cnpj: number,
    startHire: string,
    endHire: string,
    standards?: Array<{
        id: string,
        name: string
        rating: number
    }>
    complianceAssessed?: boolean
    token?: string
};

@Injectable()
export class CompanyService {
    constructor(private client: HttpClient) {}

    async create(company: CompanyModel): Promise<boolean> {
        const {success, data} = await this.client.post<BaseResponse<boolean>>(`companies`, company).toPromise();
        return success;
    }

    async getAll(): Promise<Array<CompanyModel>> {
        const { data, success } = await this.client.get<BaseResponse<Array<CompanyModel>>>(`companies`).toPromise();
        return data;
    }
}
