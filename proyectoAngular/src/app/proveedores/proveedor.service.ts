import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from './proveedor';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private url: string = environment.proveedoresUrl;
  constructor(private http: HttpClient) { }


  //Obtener todos los proveedores

  getAll(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.url);
  }

  // Crear un proveedor
  create(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.url, proveedor);
  }


  // Obtener un proveedor

  get(nif: string): Observable<Proveedor> {
    return this.http.get<Proveedor>(this.url + "/" + nif)
  }


  // Actualizar un proveedor

  update(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(this.url, proveedor);
  }

  // Eliminar un provvedor

  delete(nif: string): Observable<Proveedor> {
    return this.http.delete<Proveedor>(this.url + '/' + nif);
  }
}
