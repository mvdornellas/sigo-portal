import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  email: string;
  name: number;
  cnpj: number;
  startHire: string;
  endHire: string;
  rating: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 1, email: 'Hydrogen', cnpj: 1.0079, startHire: 'H' , endHire: 'teste', rating: 1},
  {name: 2, email: 'Helium', cnpj: 4.0026, startHire: 'He' , endHire: 'teste', rating: 1},
  {name: 3, email: 'Lithium', cnpj: 6.941, startHire: 'Li' , endHire: 'teste', rating: 1},
  {name: 4, email: 'Beryllium', cnpj: 9.0122, startHire: 'Be' , endHire: 'teste', rating: 1},
  {name: 5, email: 'Boron', cnpj: 10.811, startHire: 'B' , endHire: 'teste', rating: 1},
  {name: 6, email: 'Carbon', cnpj: 12.0107, startHire: 'C' , endHire: 'teste', rating: 1},
  {name: 7, email: 'Nitrogen', cnpj: 14.0067, startHire: 'N' , endHire: 'teste', rating: 1},
  {name: 8, email: 'Oxygen', cnpj: 15.9994, startHire: 'O' , endHire: 'teste', rating: 1},
  {name: 9, email: 'Fluorine', cnpj: 18.9984, startHire: 'F' , endHire: 'teste', rating: 1},
  {name: 10, email: 'Neon', cnpj: 20.1797, startHire: 'Ne' , endHire: 'teste', rating: 1},
];

@Component({
  selector: 'app-table-company',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class CompanyTableComponent implements OnInit,  AfterViewInit {

  constructor(private companyService: CompanyService) { }

  displayedColumns: string[] = ['name', 'email', 'cnpj', 'startHire', 'endHire', 'rating'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    const companies = this.companyService.list();
    this.dataSource = new MatTableDataSource(companies.map(company => {
      return {
        email: company.email,
        name: company.name,
        cnpj: company.cnpj,
        startHire: company.startHire,
        rating: company.rating,
        endHire: company.endHire
      } as unknown as PeriodicElement;
    }));

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

}
