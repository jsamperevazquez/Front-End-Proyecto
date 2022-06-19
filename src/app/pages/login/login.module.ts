import { NgModule } from '@angular/core'
import { LoginComponent } from './login.component'
import { NzFormModule } from 'ng-zorro-antd/form'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { RouterModule, Routes } from '@angular/router'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';

const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule
  ],
  exports: [LoginComponent]
})
export class LoginModule {}
