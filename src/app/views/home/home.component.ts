import { Component } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { Data } from '../../models/data.model';
import { GameType } from '../../enums/game-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  GameType = GameType;

  private _selectedTables: Array<Number>;
  private _max:number = 10;

  public title = 'Die kleine 1x1-Rakete';

  public button_2_selected = false;
  public button_3_selected = false;
  public button_4_selected = false;
  public button_5_selected = false;
  public button_6_selected = false;
  public button_7_selected = false;
  public button_8_selected = false;
  public button_9_selected = false;
  public button_10_selected = false;

  constructor(private _router: Router, private _data: Data) {
    this._selectedTables = [];
  }

  /**
   * PUBLIC METHODS
   **/
  public start(type: GameType): void {
    this._data.storage = [];
    this._selectedTables.forEach(element => {
      this._data.storage.push(element);
    });
    if (type === GameType.TASK) {
      this._router.navigate(['/little-tables-limited-by-task']);
    } else {
      this._router.navigate(['/little-tables-limited-by-time']);
    }
  }

  public impressum(): void {
		const element = document.querySelector('#pageTop');
		if (element) {
			element.scrollIntoView();
		}
		this._router.navigate(['impressum']);
	}

  public change(group:MatButtonToggleGroup): void {
    if (group.value.length>this._max) {
      let newValue=group.value;
      newValue.shift();
      group.value=newValue;
    }
    this.createTableArray(group);
  }

  public selectedTables() {
    return this._selectedTables;
  }

  public startDisabled(): boolean {
    if (this._selectedTables.length === 0) {
      return true;
    }
    return false;
  }

  /**
   * PRIVATE METHODS
   **/
  private createTableArray(group: MatButtonToggleGroup) {
    this._selectedTables = [];
    if (group.value.includes('2')) {
      this._selectedTables.push(2);
    }
    if (group.value.includes('3')) {
      this._selectedTables.push(3);
    }
    if (group.value.includes('4')) {
      this._selectedTables.push(4);
    }
    if (group.value.includes('5')) {
      this._selectedTables.push(5);
    }
    if (group.value.includes('6')) {
      this._selectedTables.push(6);
    }
    if (group.value.includes('7')) {
      this._selectedTables.push(7);
    }
    if (group.value.includes('8')) {
      this._selectedTables.push(8);
    }
    if (group.value.includes('9')) {
      this._selectedTables.push(9);
    }
    if (group.value.includes('10')) {
      this._selectedTables.push(10);
    }
  }

  /**
   * GETTER
   **/
  get taskAmountInfo(): string {
    if (!this._selectedTables || this._selectedTables.length === 0) {
      return 'Eine festgelegte Anzahl von ';
    } else {
      switch(this._selectedTables.length) {
        case 1: return '24';
        case 2: return '36';
        case 3: return '48';
        case 4: return '60';
        case 5: return '60';
        case 6: return '60';
        case 7: return '63';
        case 8: return '64';
        case 9: return '63';
        case 10: return '60';
      }
      return String(this._selectedTables.length);
    }
  }
}

