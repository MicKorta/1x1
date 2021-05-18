import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routes';
import { FooterModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(HomeRoutes),
  ],
})
export class HomeModule {
  // NOOP
}
