import { Component, Input, Output, EventEmitter } from '@angular/core';
import { zoomIt } from '../../animations/animations';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [
    zoomIt
  ]
})
export class ResultComponent {

  @Output() onExit = new EventEmitter();
  @Output() onRestart = new EventEmitter();

  private _correctAnswersAmount!: number;
  private _incorrectAnswersAmount!: number;
  private _totalTaskAmount!: number;

  /** PUBLIC - METHODS */
  public exit(): void {
    this.onExit.emit();
  }

  public restart(): void {
    this.onRestart.emit();
  }

  /**
   * SETTER
   */
  @Input()
  set correctAnswersAmount(value: number) {
    this._correctAnswersAmount = value;
  }

  @Input()
  set incorrectAnswersAmount(value: number) {
    this._incorrectAnswersAmount = value;
  }

  @Input()
  set totalTaskAmount(value: number) {
    this._totalTaskAmount = value;
  }

  /**
   * GETTER
   */
  get correctAnswersAmount(): number {
    return this._correctAnswersAmount;
  }

  get incorrectAnswersAmount(): number {
    return this._incorrectAnswersAmount;
  }

  get totalTaskAmount(): number {
    return this._totalTaskAmount;
  }

  get tasksLeft(): number {
    return this._totalTaskAmount - this._correctAnswersAmount;
  }
}
