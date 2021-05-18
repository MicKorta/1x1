import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { BoardsComponent } from './boards.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BoardsComponent,
  ],
  exports: [
    BoardsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
})
export class BoardsModule {
  // NOOP
}
