import { Component, OnInit } from '@angular/core'
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
export class DashboardComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject();

  clients: Client[] = this._apiService.clients;
  products: Product[] = this._apiService.products;
  providers: Provider[] = this._apiService.providers;

  pageIndex: number = 0

  constructor(private _apiService: ApiService) {}

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
  }

  private _getPageData() {
    const actions: any = {
      0: this._apiService.getClients,
      1: this._apiService.getProducts,
      2: this._apiService.getProviders
    }

    actions[this.pageIndex]().subscribe()
  }

  hndHeaderLinkClick(pageIndex: number) {
    this.pageIndex = pageIndex
    this._getPageData()
  }
}
