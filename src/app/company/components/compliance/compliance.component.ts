import { NotificationService } from './../../../_shared/services/notification.service';
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
  complianceAssessed = false;
  loading = false;
  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private complianceService: ComplianceService,
              private activatedRoute: ActivatedRoute,
              private progressBarService: ProgressBarService,
              private  authService: AuthService,
              private notification: NotificationService,
              private router: Router) {
                this.progressBarService.isLoading$.subscribe(isLoading => {
                  this.loading = isLoading;
                });
              }

  async ngOnInit(): Promise<void> {
    if (this.authService.isLoggedIn()) {
      this.notification.show('Gestor, você não pode visualizar o formulário de avaliação de conformidade, somente é possível visualizar as respostas!', 'Entendi', {
        duration: 30000
      });
      await this.router.navigate(['/dashboard']);
    } else{
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

    if (this.form.valid && !this.complianceAssessed) {
      const updated = await this.complianceService.updateAll(this.company.id, standards.value);
      this.complianceAssessed = updated;
    }

  }

  async ratingChange(value, index): Promise<void> {
    const standards = this.form.controls.standards as FormArray;
    const formGroup = standards.controls[index] as FormGroup;
    formGroup.controls.rating.setValue(value.rating);
  }

  validateAllFormFields(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    console.log(control);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    } else if (control instanceof FormArray) {
      formGroup.markAllAsTouched();
    }
  });

  }


}
