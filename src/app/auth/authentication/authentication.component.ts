import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes  } from '@aws-amplify/ui-components';
import { UserData, UserService } from '../../_shared/service/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  title = 'sigo';
  user: UserData | undefined;
  authState: AuthState;
  signUpformFields: FormFieldTypes;
  signInformFields: FormFieldTypes;

  constructor(private ref: ChangeDetectorRef) {
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
