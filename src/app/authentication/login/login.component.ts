import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);

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
        const admin = response['admin'] ??  false;
        console.log(admin);
        localStorage.setItem('admin', admin);
        console.log('passou');
        this.router.navigate(['/home/dashboard']);
      }
    })
  }
}



