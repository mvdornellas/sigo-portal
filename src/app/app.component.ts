import { ProgressBarService } from './_shared/services/progress-bar.service';
import { Auth } from '@aws-amplify/auth';
import { UserData, AuthService } from './auth/services/auth.service';
import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sigo';
  user: UserData;
  isLoggedIn = false;
  isLoading = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService,
              private router: Router, private ref: ChangeDetectorRef , private zone: NgZone,
              private progressBarService: ProgressBarService, private httpClient: HttpClient) {
    this.user = this.authService.getUserData();
    this.progressBarService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.authenticatedAnnounced$.subscribe(user => {
      this.isLoggedIn = true;
      this.user = user;
      this.router.navigate(['/dashboard']);
    });
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
    this.isLoggedIn = false;
  }


}
