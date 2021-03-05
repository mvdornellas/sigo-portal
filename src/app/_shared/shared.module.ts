import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarService } from './services/progress-bar.service';
import { InterceptorService } from './services/interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  providers: [
    ProgressBarService,
    InterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
