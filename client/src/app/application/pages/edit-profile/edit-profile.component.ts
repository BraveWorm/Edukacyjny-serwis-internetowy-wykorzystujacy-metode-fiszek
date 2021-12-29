import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/auth/profile/profile.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  dataForm = this.formBuilder.group({
    name: [''],
    description: [''],
  });


  form = new FormGroup({
    newPass: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
    oldPass: new FormControl('', [
      Validators.required,
    ]),
  });


  ngOnInit(): void { }

  setName(): void {
    this.profileService.setName(this.dataForm.controls.name.value).subscribe();
    this.showToastrData();
  }

  setDesc(): void {
    this.profileService
      .setDesc(this.dataForm.controls.description.value)
      .subscribe();
    this.showToastrData();
  }

  changePass(): void {
    const { valid } = this.form;
    if (valid) {
      this.profileService.changePassword(this.form.controls.oldPass.value, this.form.controls.newPass.value).subscribe(
        {
          next:() =>
          {
            this.showToastr();
            this.router.navigate(['profile']); 
          },
          error:() => {
            this.loginFailedTostr();
            this.form.controls.oldPass.setValue('');
            this.form.controls.newPass.setValue('');
          }
        }
      )
    }
  }
    showToastr() {
      this.toastr.success('Udało się pomyślnie edytować dane', 'Zmieniono hasło', {
      timeOut: 1000,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
     });
    }
  showToastrData() {
      this.toastr.success('Udało się pomyślnie edytować dane', '', {
      timeOut: 1000,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
     });
    }
    loginFailedTostr() {
    this.toastr.error('Stare hasło jest nieprawidłowe', 'Nie udało się zmienić hasła', {
      timeOut: 1500,
      progressBar: false,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
     });
  }
}
