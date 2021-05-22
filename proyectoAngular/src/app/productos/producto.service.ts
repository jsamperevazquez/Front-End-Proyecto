import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = "/api/productos";



  constructor(private http: HttpClient) { }

  //obtener todos los productos
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  //Crear un producto
  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto);
  }

  // Obtener un producto
  get(codigo: number): Observable<Producto> {
    return this.http.get<Producto>(this.url + '/' + codigo);
  }

  //Actualizar un producto
  update(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.url, producto);

  }

  //Eliminar un Producto
  delete(codigo: number): Observable<Producto> {
    return this.http.delete<Producto>(this.url + '/' + codigo);
  }
}
