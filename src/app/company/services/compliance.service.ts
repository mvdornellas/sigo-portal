import { BaseResponse } from './../../_shared/services/base.service.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyModel } from './company.service';
import { StandardModel } from './standard.service';

export type ComplianceModel = {
    company: CompanyModel,
    standards: StandardModel[]
};

@Injectable()
export class ComplianceService {
    constructor(private client: HttpClient) {}

    async get(id): Promise<ComplianceModel> {
        const { data, success } = await this.client.get<BaseResponse<ComplianceModel>>(`companies/${id}/compliance`).toPromise();
        return data;
    }

    async updateAll(companyId: string, standards: StandardModel[]): Promise<StandardModel[]>{
        const { data, success } = await this.client.put<BaseResponse<StandardModel[]>>(`companies/${companyId}/compliance`, {
            standards
        }).toPromise();
        return data;
    }
}
