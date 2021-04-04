import { NotificationService } from './../../_shared/services/notification.service';
import { AuthService } from './../services/auth.service';
import {Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { UserData } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProgressBarService } from 'src/app/_shared/services/progress-bar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'sigo';
  user: UserData | undefined;
  isLoading = false;
  // signUpformFields = [
  //   {
  //     type: 'username',
  //     label: 'Username',
  //     placeholder: 'Username',
  //     required: false
  //   },
  //   {
  //     type: 'email',
  //     label: 'Email',
  //     placeholder: 'Email',
  //     required: true
  //   },
  //   {
  //     type: 'name',
  //     label: 'Nome',
  //     placeholder: 'Nome',
  //     required: true
  //   },
  //   {
  //     type: 'password',
  //     label: 'Senha',
  //     placeholder: 'Senha',
  //     required: true
  //   }
  // ];

  @Input() error: string | null;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private progressBarService: ProgressBarService) {
                this.progressBarService.isLoading$.subscribe(isLoading => {
                  this.isLoading = isLoading;
                });
              }


  ngOnInit(): void {

  }

  login(): void {
    if (this.loginForm.valid) {
      this.progressBarService.show();
      const {username, password} = this.loginForm.value;
      Auth.signIn({
        username,
        password
      }).then(user => {
        this.progressBarService.hide();
        this.authService.announceAuthicated({
          username: user.username,
          ...user.attributes
        });
      }).catch(error => {
      this.progressBarService.hide();
      this.handleAuthError(error);
      });
    }
  }

  handleAuthError({code}: {
    code: string,
    message: string,
    name: string
  }): void {

    switch (code) {
        case 'UserNotFoundException':
          this.notificationService.show('Usuário não encontrado', 'Entendi');
          break;
        case 'NotAuthorizedException':
          this.notificationService.show('Usuário ou senha inválido', 'Entendi');
          break;
        default:
          break;
      }
    }

}
