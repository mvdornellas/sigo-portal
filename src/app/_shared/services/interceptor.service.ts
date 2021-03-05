import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressBarService } from './progress-bar.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private progressBarService: ProgressBarService) {}

    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        this.progressBarService.show();
        return next.handle(request).pipe(finalize(() => this.progressBarService.hide()));
    }
}
