import { ActivatedRoute } from '@angular/router';
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
        const response = await this.client
        .get<BaseResponse<ComplianceModel>>(`companies/${id}/compliance`).toPromise().catch(e => {
            throw e;
        });
        return response.data;
    }

    async updateAll(companyId: string, standards: StandardModel[]): Promise<boolean>{
        const response = await this.client.put<BaseResponse<StandardModel[]>>(`companies/${companyId}/compliance`, {
            standards
        }).toPromise();
        console.log(response);
        return response.success;
    }
}
