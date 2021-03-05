import {Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthState, FormFieldTypes  } from '@aws-amplify/ui-components';
import { UserData } from '../../_shared/service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  title = 'sigo';
  user: UserData | undefined;
  authState: AuthState;
  signUpformFields: FormFieldTypes;
  signInformFields: FormFieldTypes;

  @Input() error: string | null;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {

  }

  submit(): void {
    if (this.form.valid) {
    }
  }

}
