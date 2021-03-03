import {Component, OnInit } from '@angular/core';

import { AuthState, FormFieldTypes  } from '@aws-amplify/ui-components';
import { UserData } from '../../_shared/service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'sigo';
  user: UserData | undefined;
  authState: AuthState;
  signUpformFields: FormFieldTypes;
  signInformFields: FormFieldTypes;

  constructor() {
    this.signUpformFields = [
      {
        type: 'username',
        label: 'Username',
        placeholder: 'Username',
        required: false
      },
      {
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        required: true
      },
      {
        type: 'name',
        label: 'Nome',
        placeholder: 'Nome',
        required: true
      },
      {
        type: 'password',
        label: 'Senha',
        placeholder: 'Senha',
        required: true
      }
    ];

    this.signInformFields = [
      {
        type: 'username',
        label: 'Username',
        placeholder: 'Login',
        required: false
      },
      {
        type: 'password',
        label: 'Senha',
        placeholder: 'Senha',
        required: true
      }
    ];
  }

  ngOnInit(): void {

  }

}
