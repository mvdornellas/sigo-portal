import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyComplianceComponent } from './compliance.component';

describe('ComplianceComponent', () => {
  let component: CompanyComplianceComponent;
  let fixture: ComponentFixture<CompanyComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
