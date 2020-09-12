import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetInfoService } from '../services/get-info.service'
import { Router } from "@angular/router"
import {Observable, Observer} from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}



@Component({
  selector: 'app-medidores',
  templateUrl: './medidores.component.html',
  styleUrls: ['./medidores.component.css']
})
export class MedidoresComponent implements OnInit {
  public cedula: string;
  asyncTabs: Observable<ExampleTab[]>;
  medidoresList=[];
  facturasList=[];
  
  constructor(private route: ActivatedRoute, private infoService: GetInfoService,
    private router : Router) { 
      
    }

  ngOnInit(): void {
    this.cedula = this.route.snapshot.paramMap.get("id");
    this.getAllMedidor();
    
    
    
  }
  getAllMedidor(){
      this.infoService.getMedidores(this.cedula).subscribe(medidores => {
        if (Object.keys(medidores).length>0){
          for (var medidor in medidores){
            var codigoMedidor = medidores[medidor]["CodigoMedidor"]
            var tipo =medidores[medidor]["Tipo"]
            let plantilla = `<div class="card grid-item" style="width: 18rem;">
                              <div class="card-body">
                                <h5 class="card-title">Medidor ${codigoMedidor}</h5>
                                <p class="card-text">Tipo: ${tipo}</p>
                              </div>
                            </div>`
            this.medidoresList.push(codigoMedidor);
            this.infoService.getFacturas(codigoMedidor).subscribe(facturas => {
              var infofactura =[];
              if (Object.keys(facturas).length>0){
                for (var factura in facturas){
                  var consumo =facturas[factura]["Consumo"]
                  var deuda =facturas[factura]["Deuda"]
                  var emision =facturas[factura]["FechaEmision"]
                  var vence =facturas[factura]["FechaVencimiento"]
                  var numero =facturas[factura]["NumeroFactura"]
                  infofactura.push([numero,emision,vence,consumo,deuda])
                  console.log(infofactura)
                }
                this.facturasList.push(infofactura)
                console.log(this.facturasList)
              }
              
            });
            

            document.getElementById('contenido').innerHTML += plantilla
            
          }
          console.log(this.medidoresList)
          console.log(this.facturasList)
        }
        else{
          alert("No hay medidores");
        }
      });
  }

  perfil(){
    this.router.navigate(['perfil',this.cedula]);
  }

  logout(){
    this.router.navigate(['login']);
  }

  
  


}
