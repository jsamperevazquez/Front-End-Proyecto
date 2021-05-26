import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(
      c => this.clientes = c
    );
  }

  delete(cliente: Cliente): void {
    console.log("Borrar");
    this.clienteService.delete(cliente.dni).subscribe(

      res => this.clienteService.getAll().subscribe(
        respon => this.clientes = respon

      )
    );
  }
}
