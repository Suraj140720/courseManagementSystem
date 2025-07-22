import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Route being accessed:', state.url);

    const token = localStorage.getItem('token'); 
    if (token) {
      const tokenPayload = this.parseToken(token);
      if (tokenPayload) {
        console.log('Token role before lowercase:', tokenPayload.role);
        
        const userRole = tokenPayload.role.toLowerCase();
        const requiredRoles = route.data.roles.map((role: string) => role.toLowerCase());
        
        console.log('Comparing roles:', userRole, 'with', requiredRoles);
        
        if (requiredRoles.includes(userRole)) {
          console.log('Role match found - Access granted');
          return true;
        }
      }
    }

    this.router.navigate(['/login']);
    return false;
  }

  private parseToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Token parsing failed:', error);
      return null;
    }
  }
}
