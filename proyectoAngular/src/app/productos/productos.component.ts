import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getAll().subscribe(
      p => this.productos = p
    );
  }

  delete(producto: Producto): void {
    console.log("Borrar");
    this.productoService.delete(producto.codigo).subscribe(

      res => this.productoService.getAll().subscribe(
        respon => this.productos = respon

      )
    );
  }

}
