import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes  } from '@aws-amplify/ui-components';
import { UserData, UserStorage } from '../_shared/storage/user.storage';

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

  constructor(private ref: ChangeDetectorRef, private userStorage: UserStorage) {
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
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      const currentUser = authData as CognitoUserInterface;
      const currentUserData = {
        username: currentUser.username,
       ...currentUser.attributes
      };
      this.userStorage.saveData(currentUserData);
      this.user = currentUserData;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
