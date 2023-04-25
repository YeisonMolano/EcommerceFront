import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth : boolean

  constructor() {
    this.auth = false
   }

  logIn(isAdmin: boolean){
    if(isAdmin){
      this.auth = true
    }
  }

  logOut(){
    this.auth = false
  }
}
