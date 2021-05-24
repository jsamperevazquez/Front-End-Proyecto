import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClienteComponent } from './clientes/form-cliente.component';
import { FormsModule } from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';
import { FormProductoComponent } from './productos/form-producto.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { FormProveedorComponent } from './proveedores/form-proveedor.component';
const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'clientes/form', component: FormClienteComponent },
  { path: 'productos/form', component: FormProductoComponent },
  { path: 'proveedores/form', component: FormProveedorComponent },
  { path: 'clientes/form/:dni', component: FormClienteComponent },
  { path: 'productos/form/:codigo', component: FormProductoComponent },
  { path: 'proveedores/form/:nif', component: FormProveedorComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    FormClienteComponent,
    ProductosComponent,
    FormProductoComponent,
    ProveedoresComponent,
    FormProveedorComponent,
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
