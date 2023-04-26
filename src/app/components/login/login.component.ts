import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isAdmin: boolean
  formLogin: FormGroup
  username: string

  constructor(private fb: FormBuilder, private aService: AuthService, private route: Router){
    this.isAdmin = false
    this.username = ''
    this.formLogin = fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('',[])
    })
  }

  logIn(){
    if(this.formLogin.valid){
      this.username = this.formLogin.get('username')?.value
      if(this.formLogin.get('isAdmin')?.value != ''){
        this.isAdmin = true
      }
      this.aService.logIn(this.isAdmin, this.username)
      this.route.navigate(['principal'])
    }
  }

}
