import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarService } from './services/progress-bar.service';
import { InterceptorService } from './services/interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NotificationService } from './services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WebsocketService } from './services/ws.service';



@NgModule({
  declarations: [],
  providers: [
    NotificationService,
    ProgressBarService,
    InterceptorService,
    WebsocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    { provide: 'BASE_API_URL', useValue: environment.baseApiUrl },
    { provide: 'WSS_URL', useValue: environment.wssUrl },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
