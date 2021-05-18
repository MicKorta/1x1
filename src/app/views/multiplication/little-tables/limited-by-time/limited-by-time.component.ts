import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Data } from '../../../../models/data.model';
import { LittleTables } from '../little-tables.base';
import { slideOut, smileyInOut, shakeIt, tadaIt, zoomIt } from '../../../../animations/animations';
import { GameType } from '../../../../enums/game-type.enum';

@Component({
  selector: 'app-little-tables-limited-by-time',
  templateUrl: './limited-by-time.component.html',
  styleUrls: ['./limited-by-time.component.scss'],
  animations: [
    slideOut, smileyInOut, shakeIt, tadaIt, zoomIt
  ]
})
export class LittleTablesLimitedByTimeComponent extends LittleTables {

  constructor(@Inject(Data) data: Data, @Inject(Router) router: Router) {
      super(data, router, GameType.TIME);
  }
}
