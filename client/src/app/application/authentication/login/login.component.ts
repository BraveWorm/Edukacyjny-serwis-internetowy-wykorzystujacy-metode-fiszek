import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private loginService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  submitForm(): void {
    const { valid, value } = this.form;
    if (valid) {
        this.loginService.login(value).subscribe(
          {
            next: (token)=>
            {
                 this.showToastr();
                 this.loginService.setSession(token.accessToken) 
                 this.loginService.isUserLoggedIn.next(true)  
                 this.router.navigate(['logged-in']); 
            },
            error:() =>
            {
                this.loginFailedTostr()
            }
          }
        )
    }
  }

  showToastr() {
    this.toastr.success('Udało się pomyślnie zalogować', 'Zalogowano', {
      timeOut: 1000,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
     });
  }
  loginFailedTostr() {
    this.toastr.error('Błąd', 'Nie zalogowano', {
      timeOut: 1000,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
     });
  }
}
