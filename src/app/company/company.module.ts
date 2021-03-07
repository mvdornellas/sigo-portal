import { SharedModule } from './../_shared/shared.module';
import { StandardsModule } from './../standards/standards.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from './services/company.service';
import { CompanyTableComponent, ComplianceRatingComponent } from './components/table/table.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { CompanyAddComponent } from './components/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {  MatListModule } from '@angular/material/list';
import { CompanyComplianceComponent } from './components/compliance/compliance.component';
import { StarRatingModule } from 'angular-star-rating';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [CompanyTableComponent, CompanyAddComponent, CompanyComplianceComponent, ComplianceRatingComponent],
  imports: [
    CommonModule,
    StandardsModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StarRatingModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSelectModule,
    MatGridListModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatListModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [CompanyService],
  exports: [CompanyTableComponent, CompanyAddComponent, CompanyComplianceComponent]
})
export class CompanyModule { }
