import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { API } from 'src/backend'
import Client from '../models/client.model'
import Product from '../models/product.model'
import Provider from '../models/provider.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  onClientsChanges$: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(
    []
  )
  onProductsChanges$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([])
  onProvidersChanges$: BehaviorSubject<Provider[]> = new BehaviorSubject<
    Provider[]
  >([])

  constructor(private _http: HttpClient) {}

  //#region Getters & Setters
  get clients(): Client[] {
    return this.onClientsChanges$.value
  }

  set clients(values: Client[]) {
    this.onClientsChanges$.next(values)
  }

  get products(): Product[] {
    return this.onProductsChanges$.value
  }

  set products(values: Product[]) {
    this.onProductsChanges$.next(values)
  }

  get providers(): Provider[] {
    return this.onProvidersChanges$.value
  }

  set providers(values: Provider[]) {
    this.onProvidersChanges$.next(values)
  }
  //#endregion

  //#region Client CRUD
  getClients(): Observable<Client[]> {
    const URL = API.GET_ENDPOINT(['clientes'])
    return this._http
      .get<Client[]>(URL)
      .pipe(tap((values) => (this.clients = values)))
  }

  postClient(client: Client): Observable<Client> {
    const URL = API.GET_ENDPOINT(['clientes'])
    return this._http.post<Client>(URL, client).pipe(
      tap((response) => {
        const clients = [...this.clients, response]
        this.clients = clients
      })
    )
  }

  putClient(client: Client): Observable<Client> {
    const URL = API.GET_ENDPOINT(['clientes'])
    return this._http.put<Client>(URL, client)
  }

  deleteClient(clientId: string): Observable<Client> {
    const URL = API.GET_ENDPOINT(['clientes', clientId])
    return this._http.delete<Client>(URL).pipe(
      tap(() => {
        const clients = this.clients.filter((client) => client.dni !== clientId)
        this.clients = clients
      })
    )
  }
  //#endregion

  //#region Product CRUD
  getProducts(): Observable<Product[]> {
    const URL = API.GET_ENDPOINT(['productos'])
    return this._http
      .get<Product[]>(URL)
      .pipe(tap((values) => (this.products = values)))
  }

  postProduct(product: Product): Observable<Product> {
    const URL = API.GET_ENDPOINT(['productos'])
    return this._http.post<Product>(URL, product).pipe(
      tap((response) => {
        const products = [...this.products, response]
        this.products = products
      })
    )
  }

  putProduct(product: Product): Observable<Product> {
    const URL = API.GET_ENDPOINT(['productos'])
    return this._http.put<Product>(URL, product)
  }

  deleteProduct(productId: number): Observable<Product> {
    const URL = API.GET_ENDPOINT(['productos', productId])
    return this._http.delete<Product>(URL).pipe(
      tap(() => {
        const products = this.products.filter((product) => product.codigo !== productId)
        this.products = products
      })
    )
  }
  //#endregion

  //#region Provider CRUD
  getProviders(): Observable<Provider[]> {
    const URL = API.GET_ENDPOINT(['proveedores'])
    return this._http
      .get<Provider[]>(URL)
      .pipe(tap((values) => (this.providers = values)))
  }

  postProvider(provider: Provider): Observable<Provider> {
    const URL = API.GET_ENDPOINT(['proveedores'])
    return this._http.post<Provider>(URL, provider).pipe(
      tap((response) => {
        const providers = [...this.providers, response]
        this.providers = providers
      })
    )
  }

  putProvider(provider: Provider): Observable<Provider> {
    const URL = API.GET_ENDPOINT(['proveedores'])
    return this._http.put<Provider>(URL, provider)
  }

  deleteProvider(providerId: string): Observable<Provider> {
    const URL = API.GET_ENDPOINT(['proveedores', providerId])
    return this._http.delete<Provider>(URL).pipe(
      tap(() => {
        const providers = this.providers.filter((provider) => provider.nif !== providerId)
        this.providers = providers
      })
    )
  }
  //#endregion
}
