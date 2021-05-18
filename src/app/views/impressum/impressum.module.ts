import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpressumRoutes } from './impressum.routes';
import { ImpressumComponent } from './impressum.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
	  ImpressumComponent
  ],
  exports: [
    ImpressumComponent
  ],
  imports: [
	  MaterialModule,
	  CommonModule,
	  RouterModule.forChild(ImpressumRoutes)
  ],
  providers: []
})
export class ImpressumModule {
	// NOOP
}
