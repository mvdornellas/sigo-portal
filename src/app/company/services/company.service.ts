import { Injectable } from '@angular/core';

export type CompanyModel = {
    id: number
    name: string,
    email: string,
    cnpj: string,
    standards: Array<{
        id: string,
        name: string,
        rating?: number
    }>
    startHire: string,
    endHire: string,
    token?: string
};

@Injectable()
export class CompanyService {
    add(company: CompanyModel): boolean{
        return true;
    }

    list(): Array<CompanyModel>{
        return  [{
            id: 1,
            name: 'Marcos teste',
            cnpj: 'jh83272983',
            email: 'dornellas13@gmail.com',
            endHire: '7689732',
            startHire: '2828923',
            standards: [{id: 'NR-1', name: 'TESTE NR-1', rating: 10 }, {id: 'NR-2', name: 'TESTE NR-2', rating: 3 }, {id: 'NR-3', name: 'TESTE NR-3', rating: 5 }, {id: 'NR-5', name: 'TESTE NR-5', rating: 10 }]
        }, {
            id: 1,
            name: 'Marcos teste',
            cnpj: 'jh83272983',
            email: 'dornellas13@gmail.com',
            endHire: '7689732',
            startHire: '2828923',
            standards: [{id: 'NR-1', name: 'TESTE NR-1', rating: 10 }, {id: 'NR-2', name: 'TESTE NR-2', rating: 3 }, {id: 'NR-3', name: 'TESTE NR-3', rating: 5 }, {id: 'NR-5', name: 'TESTE NR-5', rating: 10 }]
        }];
    }

    get(id: number): CompanyModel {
        return {
            id: 1,
            name: 'Marcos teste',
            cnpj: 'jh83272983',
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
