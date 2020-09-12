import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service'
import { Router } from "@angular/router"

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public cedula: string;
  constructor(private route: ActivatedRoute, private loginService: LoginService,
    private router : Router) { }

  ngOnInit(): void {
    this.cedula = this.route.snapshot.paramMap.get("id");
    this.getPerfil()
  }
  getPerfil(){
    this.loginService.getAllUser(this.cedula).subscribe(usuarios => {
      if (Object.keys(usuarios).length>0){
          var Nombre = usuarios[0]["Nombre_completo"]
          var ciudad =usuarios[0]["Ciudad"]
          var direccion =usuarios[0]["Direccion"]
          var correo =usuarios[0]["Correo"]
          let plantilla = `<div class="card grid-item" style="width: 30rem;">
                            <div class="card-body">
                              <h5 class="card-title">${Nombre}</h5>
                              <p class="card-text">Ciudad: ${ciudad}</p>
                              <p class="card-text">Direccion: ${direccion}</p>
                              <p class="card-text">Correo: ${correo}</p>
                            </div>
                          </div>`

          document.getElementById('contenido').innerHTML += plantilla
        
      }
      else{
        alert("No hay medidores");
      }
    });
}

regresar(){
  this.router.navigate(['medidores',this.cedula]);
}
logout(){
  this.router.navigate(['login']);
}

}
