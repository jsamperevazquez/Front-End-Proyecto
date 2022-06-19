import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import Credentials from 'src/app/models/credentials.model'
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthenticationService
  ) {
    this.form = this._getForm()
  }

  ngOnInit(): void {}

  private _getForm(): FormGroup {
    return this._formBuilder.group({
      email: ['demo@pinturera.com', [Validators.required]],
      password: ['demo', [Validators.required]],
      remember: [true]
    })
  }

  submitForm(): void {
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      })

      return
    }

    const credentials: Credentials = this.form.value

    if (this._authService.login(credentials)) {
      this._router.navigate(['/dashboard'])
    } else {
      this.form.get('email')?.setValue('')
      this.form.get('password')?.setValue('')
    }
  }
}
