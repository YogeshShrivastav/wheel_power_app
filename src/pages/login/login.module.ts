import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
// import { MyApp } from '../../app/app.component';

@NgModule({
  declarations: [
    LoginPage,
    // MyApp,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  
})
export class LoginPageModule {}
