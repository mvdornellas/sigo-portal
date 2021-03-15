import { Router } from '@angular/router';
import { WebsocketService } from './../../_shared/services/ws.service';
import { Auth } from 'aws-amplify';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const USER_DATA_KEY = 'user.data';

export type UserData = {
    username: string,
    name: string,
    email: string
};

@Injectable()
export class AuthService {
    private authenticated = new Subject<UserData>();
    authenticatedAnnounced$ = this.authenticated.asObservable();

    constructor(private wssService: WebsocketService, private router: Router){}

    announceAuthicated(user: UserData): void {
        this.saveUserData(user);
        this.authenticated.next(user);
        this.wssService.open();
    }

    private saveUserData(user: UserData): void {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }

    getUserData(): UserData {
        return JSON.parse(localStorage.getItem(USER_DATA_KEY)) as UserData;
    }

    private removeUserData(): void {
        localStorage.removeItem(USER_DATA_KEY);
    }

    isLoggedIn = () => this.getUserData() !== null;

    getJwtToken = async () => {
        const currentSession =  await Auth.currentSession();
        return currentSession.getIdToken().getJwtToken();
    }

    async signOut(): Promise<void> {
        await Auth.signOut();
        this.removeUserData();
        this.wssService.close();
        this.router.navigate(['/login']);
    }

}
