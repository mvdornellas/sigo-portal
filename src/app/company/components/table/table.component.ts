import { StandardService } from './../../services/standard.service';
import { CompanyModel, CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

export interface PeriodicElement {
  id: string;
  email: string;
  name: number;
  cnpj: number;
  startHire: string;
  endHire: string;
  rating: number;
}
@Component({
  selector: 'app-table-company',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class CompanyTableComponent implements OnInit,  AfterViewInit {

  constructor(private companyService: CompanyService, private bottomSheet: MatBottomSheet) { }

  displayedColumns: string[] = ['name', 'email', 'cnpj', 'startHire', 'endHire', 'rating'];
  dataSource: any = null;
  panelOpenState = false;
  companies: CompanyModel[] = null;

  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit(): Promise<void> {
    this.companies = await this.companyService.getAll();
    this.dataSource = new MatTableDataSource(this.companies.map(company => {
      return {
        id: company.id,
        email: company.email,
        name: company.name,
        cnpj: company.cnpj,
        startHire: company.startHire,
        endHire: company.endHire
      } as unknown as PeriodicElement;
    }));

    this.dataSource.sort = this.sort;


  }

  ngAfterViewInit(): void {
  }

  openBottomSheet(company: CompanyModel): void {
  this.bottomSheet.open(ComplianceRatingComponent, {
      data: {company}
    });
  }

}

@Component({
  selector: 'app-compliance-rating',
  templateUrl: 'compliance-rating.html',
})
export class ComplianceRatingComponent implements OnInit {
  company: CompanyModel = null;
  standards: Array<{
    id: string,
    name: string,
    rating?: number
}> = [];
  constructor(private bottomSheetRef: MatBottomSheetRef<CompanyTableComponent>, private standardService: StandardService ) {
    const data = this.bottomSheetRef.containerInstance.bottomSheetConfig.data;
    this.company = data.company;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  async ngOnInit(): Promise<void> {
    const standards = await this.standardService.getAll(this.company.id);
    this.standards = standards.map(standard => {
      return {
        id: standard.id,
        name: standard.name,
        rating: standard.rating
      };
    });
  }
}
