import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { TaskComponent } from './task.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TaskComponent,
  ],
  exports: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
})
export class TaskModule {
  // NOOP
}
