import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import sweetalert from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private as: AuthService) { }

  ngOnInit(): void { }

  login() {
    const { email, password } = this.myForm.value;
    this.as.login(email, password).subscribe(ok => {

      if (ok === true) {
        this.router.navigateByUrl('/heroes');
      } else {
        sweetalert.fire('Error', ok, 'error');
      }
    });
  }

}
