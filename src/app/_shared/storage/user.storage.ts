import { Injectable } from '@angular/core';
import { Auth, Amplify } from 'aws-amplify';

const USER_DATA_KEY = 'user.data';

export type UserData = {
    username: string,
    name: string,
    email: string
};

@Injectable()
export class UserStorage {

    saveData(user: UserData): void {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }

    getData(): UserData {
        return JSON.parse(localStorage.getItem(USER_DATA_KEY)) as UserData;
    }
}
