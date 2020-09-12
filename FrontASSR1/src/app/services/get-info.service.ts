import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders  } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class GetInfoService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": "Basic " + btoa('username:password')
    })
  };

  constructor(private http: HttpClient) { }

  getMedidores(cedula: string){
    const path = "https://lectormedidor.herokuapp.com/Medidores?id="+cedula;
    return this.http.get(path,this.httpOptions);
  }
  getFacturas(medidor: string){
    const path = "https://lectormedidor.herokuapp.com/Facturas?id="+medidor;
    return this.http.get(path,this.httpOptions);
  }
}
