import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
    constructor(private snackBar: MatSnackBar){}
    show(message: string, action: string, config?: {
        duration: 3000
    }): void{
        const {duration } = config;
        this.snackBar.open(message, action, {
            duration
        });
    }
}
