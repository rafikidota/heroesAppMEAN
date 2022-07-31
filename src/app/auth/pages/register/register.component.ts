import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import sweetalert from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private as: AuthService) { }

  ngOnInit(): void { }

  register() {
    const { name, email, password } = this.myForm.value;
    this.as.register(name, email, password).subscribe(ok => {
      if (ok === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        sweetalert.fire('Error', ok, 'error');
      }
    });
  }
}
