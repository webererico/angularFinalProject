import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  imports: [ReactiveFormsModule, RouterLink],
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup 

  message:any;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,private route: ActivatedRoute ,
    private router : Router
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      avatar: ['https://picsum.photos/800']
    }, { validator: this.passwordMatchValidator })
  }

  private passwordMatchValidator(fg: FormGroup) {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      fg.get("confirmPassword")?.setErrors({ passwordMismatch: true });
    } else {
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  signup() {
    console.log(this.signupForm?.value);
    this.service.signup(this.signupForm?.value).subscribe((response) => {
      this.succesMsg();
    })
  }
  succesMsg(){
    alert("*** User Registered Successfully ***")
    this.router.navigate(['login']);
  }

}
