import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from './producto';
import { ProductoService } from './producto.service';




@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  producto: Producto = new Producto();


  constructor(private productoService: ProductoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.activatedRoute.params.subscribe(
      e => {
        let codigo = e['codigo'];
        if (codigo) {
          this.productoService.get(codigo).subscribe(
            pro => this.producto = pro
          )
        }
      }
    )
  }
  create(): void {
    console.log(this.producto);
    this.productoService.create(this.producto).subscribe(
      res => this.router.navigate(['/productos'])
    )
    location.href = 'http://samairsolutions.s3-website-eu-west-1.amazonaws.com/productos'
  }

  update(): void {
    this.productoService.update(this.producto).subscribe(
      res => this.router.navigate(['/productos'])
    )

  }

}
