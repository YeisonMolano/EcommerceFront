import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth : boolean

  constructor() {
    this.auth = false
   }

  logIn(isAdmin: boolean, username: string){
    if(isAdmin){
      localStorage.setItem('auth', 'admin')
    }
    localStorage.setItem('nombre', username)
  }

  logOut(){
    localStorage.clear()
  }
}
