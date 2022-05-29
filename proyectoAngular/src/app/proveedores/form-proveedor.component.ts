import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from './proveedor';
import { ProveedorService } from './proveedor.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.css']
})
export class FormProveedorComponent implements OnInit {

  proveedor: Proveedor = new Proveedor();

  constructor(private proveedorService: ProveedorService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }


  cargar(): void {
    this.activatedRoute.params.subscribe(
      e => {
        let nif = e['nif'];
        if (nif) {
          this.proveedorService.get(nif).subscribe(
            pro => this.proveedor = pro
          )
        }
      }
    )
  }
  create(): void {
    console.log(this.proveedor);
    this.proveedorService.create(this.proveedor).subscribe(
      res => this.router.navigate(['/proveedores'])
    )
    location.href = 'http://localhost:4200/proveedores'
  }

  update(): void {
    this.proveedorService.update(this.proveedor).subscribe(
      res => this.router.navigate(['/proveedores'])
    )

  }

}
