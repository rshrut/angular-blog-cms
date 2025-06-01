import { computed, inject, Injectable, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, User } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { onAuthStateChanged } from "firebase/auth";
import { toObservable } from "@angular/core/rxjs-interop"; // 👈 make sure this is imported


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = signal<User | null>(null);
    readonly currentUser$ = toObservable(this.user.asReadonly());
    
    errorMessage = signal<string | null>(null);

    private auth = inject(Auth);
    private router = inject(Router);
    private snackbar = inject(MatSnackBar);

    constructor(){
        onAuthStateChanged(this.auth, (user) => {
            this.user.set(user)
        });
    }

    async signup(name: string, email: string, password: string){
        try{
            const result = await createUserWithEmailAndPassword(this.auth, email, password);
            await updateProfile(result.user,{displayName: name});
            this.user.set(result.user);
            this.snackbar.open('Signed up successfully!','Close',{ 
                duration: 3000, 
                panelClass: ['success-snackbar']
            });
            this.router.navigate(['/auth/login']);
        }
        catch(error: any){
            this.errorMessage.set(error.message);
            this.snackbar.open(error.message, 'close', {
                duration: 3000,
                panelClass:['error-snackbar']
            });
            throw error;
        }
    }

    async login(email: string, password: string){
        try{
            const result = await signInWithEmailAndPassword(this.auth, email, password);
            this.user.set(result.user);
            this.snackbar.open('Logged in successfully!', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
        }
        catch(error: any){
            this.errorMessage.set(error.message);
            this.snackbar.open(error.message, 'Close',{
                duration: 3000,
                panelClass:['error-snackbar']
            })
        }
    }

    async logout(){
        try{
            await signOut(this.auth);
            this.user.set(null);
            this.snackbar.open('Logged out successfully!', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
            this.router.navigate(['/']);
        }
        catch(error: any){
            this.errorMessage.set(error.message);
            this.snackbar.open(error.message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
            throw error;
        }
    }

    isAuthenticated(): boolean {
        return !!this.user();
    }

    async resetPassword(email: string){
        try{
            await sendPasswordResetEmail(this.auth, email);
            this.snackbar.open("Password reset link sent to your email", 'close', {
                duration: 3000,
                panelClass: ['success-snackbar']
            });
        }
        catch (error: any) {
            this.errorMessage.set(error.message);
            this.snackbar.open(error.message, 'close', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
            throw error;
        }
    }

}