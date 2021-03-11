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
    }>
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

    get(id: number): CompanyModel {
        return {
            id: '8q397323',
            name: 'Marcos teste',
            cnpj: 239892392,
            email: 'dornellas13@gmail.com',
            endHire: '7689732',
            startHire: '2828923',
            standards: [{id: 'NR-1', name: 'TESTE NR-1'  }, {id: 'NR-2', name: 'TESTE NR-2' }],
        };
    }

    update(company: CompanyModel): boolean {
        return true;
    }

    checkComplianceAuthorization(companyId, token): boolean {
        return true;
    }
}
