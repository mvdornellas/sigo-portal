import { Auth } from '@aws-amplify/auth';
import { UserData, UserService } from './_shared/service/user.service';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState, FormFieldTypes  } from '@aws-amplify/ui-components';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy   {
  title = 'sigo';
  user: UserData;
  isLoggedIn;
  authState: AuthState;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService,
              private router: Router, private ref: ChangeDetectorRef , private zone: NgZone) {
    this.user = this.userService.getData();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      if (authState === 'signedin'){
        const currentUser = authData as CognitoUserInterface;
        const currentUserData = {
          username: currentUser.username,
         ...currentUser.attributes
        };
        this.userService.saveData(currentUserData);
        this.user = currentUserData;
        this.zone.run(() => {
         this.isLoggedIn = true;
        });
      }
      this.ref.detectChanges();
      this.zone.run(() => {
        this.router.navigate(['/dashboard']);
      });
    });
  }


  ngOnDestroy() {
    return onAuthUIStateChange;
  }

  signOut() {
    this.isLoggedIn = false;
    Auth.signOut();
    this.userService.remove();
    this.router.navigate(['/login']);
  }


}
