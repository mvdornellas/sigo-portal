import { ActivatedRoute } from '@angular/router';
import { CompanyModel, CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class CompanyComplianceComponent implements OnInit {

  company: CompanyModel;

  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const {id: companyId} = this.activatedRoute.snapshot.params;
    this.company = this.companyService.get(companyId);
  }

}
