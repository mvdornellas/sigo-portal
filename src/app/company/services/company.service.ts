import { Injectable } from '@angular/core';

export type CompanyModel = {
    id: number
    name: string,
    email: string,
    cnpj: string,
    standards: [{
        id: string,
        name: string
    }]
    startHire: string,
    endHire: string,
    rating: number
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
            standards: [{id: '', name: '121'}],
            rating: 1

        }];
    }
}
