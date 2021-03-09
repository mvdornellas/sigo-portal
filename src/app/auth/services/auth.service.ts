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

    announceAuthicated(user: UserData): void {
        this.saveUserData(user);
        this.authenticated.next(user);
    }

    private saveUserData(user: UserData): void {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }

    getUserData(): UserData {
        return JSON.parse(localStorage.getItem(USER_DATA_KEY)) as UserData;
    }

    removeUserData(): void {
        localStorage.removeItem(USER_DATA_KEY);
    }

    isLoggedIn = () => this.getUserData() !== null;

    getJwtToken = async () => {
        const currentSession =  await Auth.currentSession();
        return currentSession.getIdToken().getJwtToken();
    }

}
