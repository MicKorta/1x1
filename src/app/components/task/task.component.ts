import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { zoomIt } from '../../animations/animations';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    zoomIt
  ]
})
export class TaskComponent {

  private _task!: Task;
  private _zoomAnimation!: boolean;

  /**
   * SETTER
  */
  @Input()
  set task(value: Task) {
    this._task = value;
  }

  @Input()
  set zoomAnimation(value: boolean) {
    this._zoomAnimation = value;
  }

  /**
   * GETTER
  */
  get task(): Task {
    return this._task;
  }

  get zoomAnimation(): boolean {
    return this._zoomAnimation;
  }
}
