import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private as: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.as.validateToken().pipe(
      tap(valid => {
        if (!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.as.validateToken().pipe(
      tap(valid => {
        if (!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
