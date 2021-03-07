import { Inject, Injectable } from '@angular/core';
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
    constructor(@Inject('BASE_API_URL') private baseApiUrl: string, private progressBarService: ProgressBarService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const api = request.clone({ url: `${this.baseApiUrl}/${request.url}` });
        this.progressBarService.show();
        return next.handle(api).pipe(finalize(() => this.progressBarService.hide()));
    }
}
