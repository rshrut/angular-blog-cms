import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule,RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email="";
  private authservice = inject(AuthService);
  private matSnackBar = inject(MatSnackBar);

  async onResetPassword(){
    try{
      await this.authservice.resetPassword(this.email);
    }
    catch(error){
      this.matSnackBar.open('Error sending reset link','Class',{
        duration: 3000,
        panelClass:['error-snackbar']
      })
    }
  }
}
