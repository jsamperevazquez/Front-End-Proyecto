import { Injectable } from '@angular/core';
import Credentials from '../models/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  get isLoggedIn(): boolean {
    return Boolean(localStorage.getItem('isLoggedIn'));
  }

  login(credentials: Credentials) {
    if (credentials.email === 'demo@pinturera.com' && credentials.password === 'demo') {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }

    return false;
  }

  constructor() { }
}
