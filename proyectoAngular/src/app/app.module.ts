import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClienteComponent } from './clientes/form-cliente.component';
import {FormsModule} from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';
const routes:Routes=[
  {path:'', redirectTo:'/clientes', pathMatch:'full'},
  {path:'clientes', component:ClientesComponent},
  {path:'clientes/form', component:FormClienteComponent},
  {path:'clientes/form/:dni', component:FormClienteComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FormClienteComponent,
    ProductosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
