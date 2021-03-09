import { AuthService } from './../../auth/services/auth.service';
import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { ProgressBarService } from './progress-bar.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(@Inject('BASE_API_URL') private baseApiUrl: string,
                private progressBarService: ProgressBarService,
                private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return from(this.handle(request, next));
    }

    async handle(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        this.progressBarService.show();
        const token = await this.authService.getJwtToken();
        const api = request.clone({
            url: `${this.baseApiUrl}/${request.url}`,
            setHeaders: {
                Authorization: token
            }
        });
        return next.handle(api)
        .toPromise()
        .finally(() => {
            this.progressBarService.hide();
        });
    }
}
