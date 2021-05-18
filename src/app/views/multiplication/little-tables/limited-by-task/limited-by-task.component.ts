import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Data } from '../../../../models/data.model';
import { LittleTables } from '../little-tables.base';
import { slideOut, smileyInOut, shakeIt, tadaIt, zoomIt } from '../../../../animations/animations';
import { GameType } from '../../../../enums/game-type.enum';

@Component({
  selector: 'app-little-tables-limited-by-task',
  templateUrl: './limited-by-task.component.html',
  styleUrls: ['./limited-by-task.component.scss'],
  animations: [
    slideOut, smileyInOut, shakeIt, tadaIt, zoomIt
  ]
})
export class LittleTablesLimitedByTaskComponent extends LittleTables  {

  constructor(@Inject(Data) data: Data, @Inject(Router) router: Router) {
      super(data, router, GameType.TASK);
  }
}
