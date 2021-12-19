import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = '';
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.login(this.loginForm.value)
    .subscribe(res => {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('token', JSON.stringify(res.user.token));
        this.router.navigate(['/chat/list']);
    },
    err => {
      this.error = 'wrong credentials';
    });

  }

}
