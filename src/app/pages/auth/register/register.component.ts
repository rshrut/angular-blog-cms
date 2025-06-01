import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from
 '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = ''
  private snackbar= inject(MatSnackBar);
  private authservice = inject(AuthService);

  async onRegister(){
    if(this.password !== this.confirmPassword){
      this.snackbar.open('Passwords do not match','Close',{
        duration: 3000,
        panelClass:['error-snackbar']
      })
    }
    try{
      await this.authservice.signup(this.name,this.email,this.password);
    }
    catch{
      this.snackbar.open('Registration failed','Close',{
        duration: 3000,
        panelClass:['error-snackbar']
      })
    }
  }
}
