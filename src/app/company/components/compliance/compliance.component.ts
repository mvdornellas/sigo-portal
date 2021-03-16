import { ProgressBarService } from 'src/app/_shared/services/progress-bar.service';
import { AuthService } from './../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { StandardModel } from '../../services/standard.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplianceService } from '../../services/compliance.service';

@Component({
  selector: 'app-compliance',
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.css']
})
export class CompanyComplianceComponent implements OnInit {
  company: CompanyModel = null;
  complianceAlreayAssessed = false;
  loading = false;
  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private complianceService: ComplianceService,
              private activatedRoute: ActivatedRoute,
              private progressBarService: ProgressBarService) {
                this.progressBarService.isLoading$.subscribe(isLoading => {
                  this.loading = isLoading;
                });
              }

  async ngOnInit(): Promise<void> {
    const {id: companyId} = this.activatedRoute.snapshot.params;
    const response = await this.complianceService.get(companyId);
    if (response) {
      const { company, standards } = response;
      this.company = company;
      this.form = this.formBuilder.group({
      standards: this.formBuilder.array(standards.map(a => this.addStandardRow(a)))
    });
    }
  }

  addStandardRow({id, name, rating}: StandardModel): FormGroup {
    return this.formBuilder.group({
      id: [id, [Validators.required]],
      name: [name, [Validators.required]],
      rating: ['', [Validators.required]]
    });
}

  async addCompliance(): Promise<void> {
    this.validateAllFormFields(this.form);
    const standards = this.form.controls.standards as FormArray;
    const updated = await this.complianceService.updateAll(this.company.id, standards.value);
  }

  async ratingChange(value, index): Promise<void> {
    const standards = this.form.controls.standards as FormArray;
    console.log(standards);
    standards.controls[index].value.rating = value.rating;
  }

  validateAllFormFields(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}

}
