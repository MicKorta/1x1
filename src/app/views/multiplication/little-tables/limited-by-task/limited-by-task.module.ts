import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LittleTablesLimitedByTaskComponent } from './limited-by-task.component';
import { LimitedByTaskRoutes } from './limited-by-task.routes';
import { MaterialModule } from './../../../../material.module';
import { TaskModule } from '../../../../components/task/task.module';
import { ResultModule } from '../../../../components/result/result.module';
import { BoardsModule } from '../../../../components/boards/boards.module';

@NgModule({
  declarations: [
    LittleTablesLimitedByTaskComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(LimitedByTaskRoutes),
    TaskModule,
    ResultModule,
    BoardsModule
  ],
})
export class LittleTablesLimitedByTaskModule {
  // NOOP
}
