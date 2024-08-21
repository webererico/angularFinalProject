import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth: Auth = inject(Auth);
  private provider = new GoogleAuthProvider();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  constructor(
    private service: AuthService,
    private router: Router
  ) { }



  login() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      if (response['access_token']) {
        console.log('entrou');

        const jwtToken = response['access_token'];
        console.log(jwtToken);
        localStorage.setItem('JWT', jwtToken);
        const admin = response['admin'] ?? false;
        console.log(admin);
        localStorage.setItem('admin', admin);
        console.log('passou');
        this.router.navigate(['/home/dashboard']);
      }
    })
  }

  loginFirebaseEmail() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.loginForm.value.email ?? '', this.loginForm.value.password ?? '')
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  loginFirebaseGoogle() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);
      return credential;
    })
  }

  logoutFirebase() {
    signOut(this.auth).then(() => {
      console.log('signed out');
    }).catch((error) => {
      console.log('sign out error: ' + error);
    })
  }
}



