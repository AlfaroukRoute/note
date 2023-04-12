import { Component , OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit  {
  isLogin: boolean = false;
  constructor(private _authS:AuthService){


  }
  ngOnInit(): void {
    this._authS.userDetails.subscribe(user => {
      this.isLogin = user ? true : false;
    })
  }

  logOut(){
    this._authS.logOuT();
  }

}
