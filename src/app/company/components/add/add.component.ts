import { ProgressBarService } from 'src/app/_shared/services/progress-bar.service';
import { Router } from '@angular/router';
import { CompanyModel, CompanyService } from './../../services/company.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { StandardService } from 'src/app/standards/services/standard.service';


@Component({
  selector: 'app-add-company',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CompanyAddComponent implements OnInit {
  standards = [];
  isLinear = false;
  companyFormGroup: FormGroup;
  standardFormGroup: FormGroup;
  hireFormGroup: FormGroup;
  makingCompanyRegister = false;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private companyService: CompanyService,
              private router: Router,
              private progressBarService: ProgressBarService,
              private standardService: StandardService) {
                this.progressBarService.isLoading$.subscribe(isLoading => {
                  this.isLoading = isLoading;
                });
              }

  async ngOnInit(): Promise<void> {
    this.companyFormGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      cnpj: [null, [Validators.required]]
    });
    this.standardFormGroup = this.formBuilder.group({
      standards: [null, Validators.required]
    });
    this.hireFormGroup = this.formBuilder.group({
      startHire: [new Date(), [Validators.required]],
      endHire: [null, [Validators.required]]
    });

    this.standards = await this.standardService.getAll();
  }

  async addCompany(): Promise<void> {
    this.makingCompanyRegister = true;
    const {name, cnpj, email} = this.companyFormGroup.controls;
    const {standards} = this.standardFormGroup.controls;
    const {startHire, endHire} = this.hireFormGroup.controls;

    const companyCreated = await this.companyService.create({
      name: name.value,
      cnpj: cnpj.value,
      email: email.value,
      standards: standards.value.map(value => this.standards.find(a => a.id === value)),
      startHire: new Date(startHire.value).toISOString(),
      endHire: new Date(endHire.value).toISOString()
    } as CompanyModel)
    .catch(() => {
      this.makingCompanyRegister = false;
    });

    if (companyCreated) {
      this.router.navigate(['/company']);
    }

  }

}
