import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  show: boolean = false;
  @Output()
  toggleSideNavEvent: EventEmitter<boolean>;
  isLoding: boolean = false;
  // currentRoute: string = '';
  isLogin: boolean = false;
  constructor(private _router: Router, private _authSer: AuthService) {
    // this._router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event) => {
    //     const e = event as NavigationEnd;
    //     this.currentRoute = e.url === '/' ? 'home' : e.url.slice(1);
    //   });

    // ****************
    // ****************
    this._authSer.userDetails.subscribe((user)=>{
      this.isLogin = user ? true : false;
    })
    // ****************
    this._authSer.isLoading.subscribe((loading)=> this.isLoding = loading)
    this.toggleSideNavEvent = new EventEmitter();
  }
  ngOnInit(): void {
    this.toggleSideNavEvent.emit(this.show);
  }

  // logOut(){
  //   this._authSer.logOuT()
  // }

  emitToggleSideNav() {
    this.show = !this.show;
    this.toggleSideNavEvent.emit(this.show);
  }
}
