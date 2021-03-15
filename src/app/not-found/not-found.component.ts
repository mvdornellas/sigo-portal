import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLoggedIn = false;

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
