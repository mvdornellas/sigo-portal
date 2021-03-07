import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarService } from './services/progress-bar.service';
import { InterceptorService } from './services/interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';



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
    {
      provide: 'BASE_API_URL', useValue: environment.baseApiUrl
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
