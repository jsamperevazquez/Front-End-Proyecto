import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = environment.clienteUrl;
  constructor(private http: HttpClient) { }

  //obtener todos los clientes
  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  //Crear un cliente
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente);
  }

  // Obtener un cliente
  get(dni: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.url + '/' + dni);
  }

  //Actualizar un cliente
  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url, cliente);

  }

  //Eliminar un cliente
  delete(dni: string): Observable<Cliente> {
    return this.http.delete<Cliente>(this.url + '/' + dni);
  }
}
