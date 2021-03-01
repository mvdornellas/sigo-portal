import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardDropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: StandardDropdownComponent;
  let fixture: ComponentFixture<StandardDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
