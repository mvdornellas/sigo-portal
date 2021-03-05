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

  @Input() error: string | null;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private progressBarService: ProgressBarService) {}


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
          this.snackBar.open('Usuário não encontrado', 'Entendi', {
          duration: 3000
          });
          break;
        case 'NotAuthorizedException':
          this.snackBar.open('Usuário ou senha inválido', 'Entendi', {
            duration: 3000
          });
          break;
        default:
          break;
      }
    }

}
