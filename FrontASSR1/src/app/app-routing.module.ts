import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MedidoresComponent } from './medidores/medidores.component';


const routes: Routes = [
  { path: '', 
    component: LoginComponent
  },
  { path: 'login', 
    component: LoginComponent
  },
  {
    path: 'perfil/:id',
    component:PerfilComponent
  },
  {
    path: 'medidores/:id',
    component:MedidoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
