import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": "Basic " + btoa('username:password')
    })
  };
  constructor(
    private http: HttpClient  ) {  }

  getAllUser(cedula: string){
    const path = "https://lectormedidor.herokuapp.com/USUARIO?id="+cedula;
    return this.http.get(path,this.httpOptions);
  }
}
