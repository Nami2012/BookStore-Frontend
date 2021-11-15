import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;

  loginStatus!: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin(): void {
    this.authService.login(this.userLoginForm.value).subscribe(
      (res: any) => {
        if (res && res.access_token) {
          this.router.navigate(['/']);
        }
      },
      (err) => {
        this.loginStatus = true;
        setTimeout(() => {
          this.loginStatus = false;
        }, 7000);
      }
    );
  }
}
