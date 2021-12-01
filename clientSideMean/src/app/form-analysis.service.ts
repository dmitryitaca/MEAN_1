import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormAnalysisService {

  constructor() { }

  nicknameValidation(nickname: String){
    if(nickname=="" || nickname == undefined){
      return false;
    }
    else{
      return true;
    }
  }
  emailValidation(email: String){
    if(email=="" || email == undefined){
      return false;
    }
    else{
      return true;
    }
  }
  passwordValidation(password: String){
    if(password=="" || password == undefined){
      return false;
    }
    else{
      return true;
    }
  }
}
