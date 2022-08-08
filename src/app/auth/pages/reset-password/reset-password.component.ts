import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import sweetalert from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private as: AuthService) { }

  ngOnInit(): void { }

  save() {
    const { email, password, confirm } = this.myForm.value;
    if (password === confirm) {
      this.as.resetPassword(email, password).subscribe(ok => {

        if (ok === true) {
          this.router.navigateByUrl('/heroes');
        } else {
          sweetalert.fire('Error', ok, 'error');
        }
      });
    }

  }
}
