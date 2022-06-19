import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._getForm();
  }

  ngOnInit(): void {
  }

  private _getForm(): FormGroup {
    return this._formBuilder.group({
      userName: ["demo@pinturera.com", [Validators.required]],
      password: ["demo", [Validators.required]],
      remember: [true]
    })
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log('submit', this.form.value)
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
