import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'
import { Router } from "@angular/router"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cedula: string;
  correo: string;


  constructor(
    private loginService: LoginService,
    private router : Router
  ){ }

  ngOnInit(): void {
  }

  getAllUser(){
    if (this.cedula!='' && this.correo!=''){
      this.loginService.getAllUser(this.cedula).subscribe(usuarios => {
        if (Object.keys(usuarios).length>0 && usuarios[0]["Correo"].toLowerCase() == this.correo.toLowerCase()){
          console.log(usuarios);
          this.router.navigate(['medidores',this.cedula]);
        }
        else{
          alert("Credenciales incorrectas");
        }
      });
      }
    else{
      alert("Credenciales incorrectas");
    }
  }

}
