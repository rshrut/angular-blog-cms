import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  private authService = inject(AuthService);
  private matSnackBar = inject(MatSnackBar);
  private router = inject(Router);
  
  async onLogin(){
    try{
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/']);
    }
    catch{
      this.matSnackBar.open('Login failed','close',{
        duration: 3000,
        panelClass:['error-snackbar']
      })
    }
  }

}
