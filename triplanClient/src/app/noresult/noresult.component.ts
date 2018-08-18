import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noresult',
  templateUrl: './noresult.component.html',
  styleUrls: ['./noresult.component.css']
})
export class NoresultComponent implements OnInit {

  public currentUser : any = {};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().then(profile => this.currentUser = profile)
        .catch(() => this.currentUser = {});
  }

  menuButtonClicked(routName) {
    this.router.navigate([routName]);
  }
  
  logout() {
    this.userService.logout();
    this.router.navigate(['/welcome']);
  }

} 