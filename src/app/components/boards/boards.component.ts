import { Decision } from './../../models/decision.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { slideOut, shakeIt, tadaIt } from '../../animations/animations';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  animations: [
    slideOut, shakeIt, tadaIt
  ]
})
export class BoardsComponent {

  @Output() onHit = new EventEmitter<Decision>();

  private _boardAnimation_1!: string;
  private _boardAnimation_2!: string;
  private _boardAnimation_3!: string;
  private _boardAnimation_4!: string;
  private _tadaAnimation_1!: boolean;
  private _tadaAnimation_2!: boolean;
  private _tadaAnimation_3!: boolean;
  private _tadaAnimation_4!: boolean;
  private _shakeAnimation_1!: boolean;
  private _shakeAnimation_2!: boolean;
  private _shakeAnimation_3!: boolean;
  private _shakeAnimation_4!: boolean;

  private _task!: Task;

  /**
   * PUBLIC - METHODS
   **/
  public hit(result: number, divId: string): void {
    let decision = new Decision(result, divId);
    this.onHit.emit(decision);
  }

  /**
   * SETTER
  */
  @Input()
  set task(value: Task) {
    this._task = value;
  }

  @Input()
  set boardAnimation_1(value: string) {
    this._boardAnimation_1 = value;
  }
  @Input()
  set boardAnimation_2(value: string) {
    this._boardAnimation_2 = value;
  }
  @Input()
  set boardAnimation_3(value: string) {
    this._boardAnimation_3 = value;
  }
  @Input()
  set boardAnimation_4(value: string) {
    this._boardAnimation_4 = value;
  }

  @Input()
  set tadaAnimation_1(value: boolean) {
    this._tadaAnimation_1 = value;
  }
  @Input()
  set tadaAnimation_2(value: boolean) {
    this._tadaAnimation_2 = value;
  }
  @Input()
  set tadaAnimation_3(value: boolean) {
    this._tadaAnimation_3 = value;
  }
  @Input()
  set tadaAnimation_4(value: boolean) {
    this._tadaAnimation_4 = value;
  }

  @Input()
  set shakeAnimation_1(value: boolean) {
    this._shakeAnimation_1 = value;
  }
  @Input()
  set shakeAnimation_2(value: boolean) {
    this._shakeAnimation_2 = value;
  }
  @Input()
  set shakeAnimation_3(value: boolean) {
    this._shakeAnimation_3 = value;
  }
  @Input()
  set shakeAnimation_4(value: boolean) {
    this._tadaAnimation_4 = value;
  }

  /**
   * GETTER
  */
  get task(): Task {
    return this._task;
  }
}
