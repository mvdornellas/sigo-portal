import { CompanyModel, CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

export interface PeriodicElement {
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

  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit(): Promise<void> {
    const companies = await this.companyService.list();
    this.dataSource = new MatTableDataSource(companies.map(company => {
      return {
        email: company.email,
        name: company.name,
        cnpj: company.cnpj,
        startHire: company.startHire,
        // standards: company.standards,
        endHire: company.endHire
      } as unknown as PeriodicElement;
    }));

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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
export class ComplianceRatingComponent {
  standards: Array<{
    id: string,
    name: string,
    rating?: number
}>;
  constructor(private bottomSheetRef: MatBottomSheetRef<CompanyTableComponent>) {
    const data = this.bottomSheetRef.containerInstance.bottomSheetConfig.data;
    const {standards} = data.company;
    this.standards = standards;
    console.log(this.standards);
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
