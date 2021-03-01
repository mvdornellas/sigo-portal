import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardService } from './servies/standard.service';
import { StandardDropdownComponent } from './components/dropdown/dropdown.component';



@NgModule({
  declarations: [StandardDropdownComponent],
  imports: [
    CommonModule
  ],
  providers: [StandardService],
  exports: [ StandardDropdownComponent ]
})
export class StandardsModule { }
