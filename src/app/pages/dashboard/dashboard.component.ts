import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable, Subject, takeUntil } from 'rxjs'
import Client from 'src/app/models/client.model'
import Product from 'src/app/models/product.model'
import Provider from 'src/app/models/provider.model'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject();
  form: FormGroup = this._getClientForm();

  clients: Client[] = this._apiService.clients;
  products: Product[] = this._apiService.products;
  providers: Provider[] = this._apiService.providers;

  pageIndex: number = 0

  isModalVisible: boolean = false;
  isModalActionCompleted: boolean = true;
  isModalEdit: boolean = false;
  modalTitle: string = '';

  constructor(private _formBuilder: FormBuilder, private _apiService: ApiService) {
  }
  
  ngOnInit(): void {
    this._apiService.onClientsChanges$.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: values => {
        this.clients = values;
      }
    })
    
    this._apiService.onProductsChanges$.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: values => {
        this.products = values;
      }
    })
    
    this._apiService.onProvidersChanges$.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: values => {
        this.providers = values;
      }
    })

    this._getPageData();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  private _getForm(values?: Client | Product | Provider): FormGroup {
    const actions: any = {
      0: this._getClientForm(values as Client),
      1: this._getProductForm(values as Product),
      2: this._getProviderForm(values as Provider)
    }

    return actions[this.pageIndex]
  }

  private _getClientForm(values?: Client): FormGroup {
    return this._formBuilder.group({
      dni: [values?.dni || '', Validators.required],
      nombre: [values?.nombre || '', Validators.required],
      apellido: [values?.apellido || '', Validators.required],
      direccion: [values?.direccion || '', Validators.required],
    })
  }

  private _getProductForm(values?: Product): FormGroup {
    return this._formBuilder.group({
      codigo: [values?.codigo || '', Validators.required],
      nombre: [values?.nombre || '', Validators.required],
      precio: [values?.precio || '', Validators.required],
    })
  }

  private _getProviderForm(values?: Provider): FormGroup {
    return this._formBuilder.group({
      nif: [values?.nif || '', Validators.required],
      nombre: [values?.nombre || '', Validators.required],
      direccion: [values?.direccion || '', Validators.required],
    })
  }


  private _getPageData() {
    const actions: any = {
      0: this._apiService.getClients(),
      1: this._apiService.getProducts(),
      2: this._apiService.getProviders()
    }

    actions[this.pageIndex].subscribe()
  }

  hndHeaderLinkClick(pageIndex: number): void {
    this.pageIndex = pageIndex
    this._getPageData()
  }

  hndAddButtonClick(event: MouseEvent): void {
    const text: any = {
      0: 'Añadir nuevo cliente',
      1: 'Añadir nuevo producto',
      2: 'Añadir nuevo proveedor'
    }

    this.modalTitle = text[this.pageIndex];

    this.isModalEdit = false;
    this.form = this._getForm();
    this.isModalVisible = true;
  }

  hndEditClientClick(client: Client): void {
    const text: any = {
      0: 'Editar cliente',
      1: 'Editar producto',
      2: 'Editar proveedor'
    }

    this.modalTitle = text[this.pageIndex];
    this.isModalEdit = true;
    this.form = this._getForm(client);
    this.isModalVisible = true;
  }

  hndEditProductClick(product: Product): void {
    this._getForm(product);
    this.isModalVisible = true;
  }

  hndEditProviderClick(provider: Provider): void {
    this._getForm(provider);
    this.isModalVisible = true;
  }

  hndDeleteClientClick(client: Client): void {
    const clientId = client.dni;
    this._apiService.deleteClient(clientId).subscribe();
  }

  hndDeleteProductClick(product: Product): void {
    const productId = product.codigo;
    this._apiService.deleteProduct(productId).subscribe();
  }

  hndDeleteProviderClick(provider: Provider): void {
    const providerId = provider.nif;
    this._apiService.deleteProvider(providerId).subscribe();
  }

  hndModalCancel(): void {
    this.isModalVisible = false;
  }

  hndModalOK(): void {
    const values = this.form.value;
    this.form.disable();
    this.isModalActionCompleted = false;

    const actions: any = {
      0: this._apiService.postClient(values as Client),
      1: this._apiService.postProduct(values as Product),
      2: this._apiService.postProvider(values as Provider),
      3: this._apiService.putClient(values as Client),
      4: this._apiService.putProduct(values as Product),
      5: this._apiService.putProvider(values as Provider)
    }

    actions[this.isModalEdit ? this.pageIndex + 3 : this.pageIndex].subscribe({
      next: () => {
        this.isModalActionCompleted = true;
        this.isModalVisible = false;
      },
      error: () => {
        this.form.enable();
        this.isModalActionCompleted = true;
      }
    });
  }
}
