import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  cliente:Cliente = new Cliente();
  titulo:string="Registro de cliente";


  constructor(private clienteService:ClienteService, private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      e=>{
        let dni=e['dni'];
        if (dni) {
          this.clienteService.get(dni).subscribe(
            cli=>this.cliente=cli
          )
        }
      }
    )
  }
  create():void{
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      res=>this.router.navigate(['/clientes'])

    )
  }

  update():void{
    this.clienteService.update(this.cliente).subscribe(
      res=>this.router.navigate(['/clientes'])
    )
  }
}
