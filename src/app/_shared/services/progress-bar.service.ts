import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProgressBarService {
    private progressbar = new Subject<boolean>();
    isLoading$ = this.progressbar.asObservable();

    show(): void {
        this.progressbar.next(true);
    }

    hide(): void {
        this.progressbar.next(false);
    }
}
