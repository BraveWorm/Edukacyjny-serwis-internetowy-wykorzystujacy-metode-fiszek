import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isSubmitted2: boolean = false;

  constructor(
    private registerService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  formRegister = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ]),
    passwordGroup: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
        password2: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ]),
      },
      [this.passwordsValidator]
    ),
  });

  get passwdGroup(): FormGroup {
    return this.formRegister.get('passwordGroup') as FormGroup;
  }

  get password1(): AbstractControl | null {
    return this.passwdGroup!.get('password');
  }

  get password2(): AbstractControl | null {
    return this.passwdGroup!.get('password2');
  }

  passwordsValidator({
    value: { password, password2 },
  }: AbstractControl): ValidationErrors | null {
    return password === password2
      ? null
      : { passwordValdatorError: 'Password should have the same values' };
  }


  // async submitForm2(): Promise<void> {
  //   const {
  //     valid,
  //     value: {
  //       email,
  //       passwordGroup: { password },
  //     },
  //   } = this.formRegister;

  //   if (valid) {
  //     try {
  //       await
  //       this.registerService.register({ email, password });
  //       this.showToastr();
  //       this.router.navigate(['login']);
  //     } catch (error) {
  //       console.log('Rejestracja się nie powiodła.');
  //       this.loginFailedTostr();
  //     }
  //   }
  // }
  check(): void {
    const {
      valid,
      value: {
        email,
        passwordGroup: { password },
      },
    } = this.formRegister;
    if (valid) {
      this.registerService.register(email, password).subscribe(
        {
          next: () => {
            this.showToastr();
            this.router.navigate(['login']); 
          },
          error: () => {
            this.loginFailedTostr();
            this.formRegister.controls.email.setValue('');
            this.passwdGroup.controls.password.setValue('');
            this.passwdGroup.controls.password2.setValue('');
          }
        }
      )
    }
  }

  showToastr() {
    this.toastr.success('Udało się pomyślnie zarejestrować', 'Zarejestrowano', {
      timeOut: 1000,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
    });
  }
  loginFailedTostr() {
    this.toastr.error('Nie udało się zarejestrować', 'Podany email jest juz w uzyciu', {
      timeOut: 2000,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
    });
  }
  theSamePassTostr() {
    this.toastr.error('Hasła powinny być takie same', '', {
      timeOut: 2000,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
    });
  }
}

