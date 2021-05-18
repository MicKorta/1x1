import { environment } from './../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { GameType } from './../enums/game-type.enum';

export class Timer {

  private _timeProgress!: number;
  private _totalTime!: number;
  private _timeGone!: number;
  private _timeLeft!: number;
  private _interval: any;
  private _onTimesUp: Subject<boolean>;
  private _subscription!: Subscription
  private TIME_PER_TASK = environment.secondsPerTask;
  private TIME_PER_GAME = environment.secondsPerGame;

  constructor(taskAmount: number, gameType: GameType) {
    this._onTimesUp = new Subject();
    if (gameType === GameType.TASK) {
      this._totalTime = taskAmount * this.TIME_PER_TASK;
    } else {
      this._totalTime = this.TIME_PER_GAME;
    }
    this._timeLeft = this._totalTime;
    this._timeGone = this._totalTime - this._timeLeft;
    this._timeProgress = 100 - (this._timeGone / this._totalTime);
  }

  public start(): void {
    this._interval = setInterval(() => {
      if(this._timeLeft > 0) {
        this._timeLeft--;
        this._timeGone = this._totalTime - this._timeLeft;
        this._timeProgress = 100 - (this._timeGone / this._totalTime * 100);
      } else {
        this._onTimesUp.next();
      }
    },1000)
  }

  public onTimesUp(): Observable<any> {
    return this._onTimesUp.asObservable();
  }

  /**
   * GETTER
   **/
  get timeProgress(): number {
    return this._timeProgress;
  }

  get timeLeft(): number {
    return this._timeLeft;
  }

  get subscription(): Subscription {
    return this._subscription;
  }

  /**
   * SETTER
   **/
  set subscription(value: Subscription) {
    this._subscription = value;
  }
}
