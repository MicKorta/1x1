import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LittleTablesLimitedByTimeComponent } from './limited-by-time.component';
import { LimitedByTimeRoutes } from './limited-by-time.routes';
import { MaterialModule } from './../../../../material.module';
import { TaskModule } from '../../../../components/task/task.module';
import { ResultModule } from '../../../../components/result/result.module';
import { BoardsModule } from '../../../../components/boards/boards.module';

@NgModule({
  declarations: [
    LittleTablesLimitedByTimeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(LimitedByTimeRoutes),
    TaskModule,
    ResultModule,
    BoardsModule
  ],
})
export class LittleTablesLimitedByTimeModule {
  // NOOP
}
