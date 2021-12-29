import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = new Subject<boolean>();

  constructor(public authService: AuthService, private toastr: ToastrService) {
    this.authService.isUserLoggedIn.subscribe((x) => console.log(x));
  }

  ngOnInit(): void {}

  showToastr() {
    this.toastr.success('Udało się pomyślnie wylogować', 'Wylogowano', {
      timeOut: 1000,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
    });
  }
}
