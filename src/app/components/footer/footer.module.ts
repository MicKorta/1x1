import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer.component';
import { ImpressumModule } from './../../views/impressum/impressum.module';

@NgModule({
  imports: [
	  CommonModule,
    HttpClientModule,
    ImpressumModule
	],
  declarations: [
	  FooterComponent
  ],
  exports: [
	  FooterComponent
  ],
  providers: []
})
export class FooterModule {
	// NOOP
}
