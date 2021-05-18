import { GameType } from './../../../enums/game-type.enum';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core';

import { environment } from './../../../../environments/environment';
import { ViewState } from '../../../enums/view-state.enum';
import { Game } from '../../../models/game.model';
import { Task } from '../../../models/task.model';
import { Timer } from '../../../services/timer.service';
import { Data } from '../../../models/data.model';
import { RandomNumberService } from '../../../services/random.service';
import { Decision } from './../../../models/decision.model';

export abstract class LittleTables implements OnDestroy {

  ViewState = ViewState;

  public smiley_true_1: string;
  public smiley_true_2: string;
  public smiley_true_3: string;
  public smiley_true_4: string;
  public smiley_true_5: string;
  public smiley_false_1: string;
  public smiley_false_2: string;
  public smiley_false_3: string;
  public smiley_false_4: string;

  public boardAnimation_1: string;
  public boardAnimation_2: string;
  public boardAnimation_3: string;
  public boardAnimation_4: string;
  public shakeAnimation_1: boolean;
  public shakeAnimation_2: boolean;
  public shakeAnimation_3: boolean;
  public shakeAnimation_4: boolean;
  public tadaAnimation_1: boolean;
  public tadaAnimation_2: boolean;
  public tadaAnimation_3: boolean;
  public tadaAnimation_4: boolean;
  public zoomAnimation: boolean;

  protected _currentTask!: Task;
  protected _currentTaskNumber: number;
  protected _timer!: Timer;
  protected _game!: Game;
  protected _selectedTables: Array<Number>;
  protected _taskProgress: number;
  protected _points: number;
  protected _correctAnswersAmount: number;
  protected _incorrectAnswersAmount: number;
  protected _showTask: boolean;
  protected _showResults: boolean;

  private _shoot = new Audio('../../assets/sounds/shoot_1.mp3');
  private _fart = new Audio('../../assets/sounds/fart_3.mp3');
  private _viewState: ViewState;

  private POINTS_PER_TASK = environment.pointsPerTask;

  constructor(private _data: Data, private _router: Router, private _gameType: GameType) {
    this._showTask = true;
    this._showResults = false;
    this._points = 0;
    this._currentTaskNumber = 0;
    this._taskProgress = 0;
    this._selectedTables = [];
    this._correctAnswersAmount = 0;
    this._incorrectAnswersAmount = 0;
    this._viewState = ViewState.VOID;
    this.shakeAnimation_1 = false;
    this.shakeAnimation_2 = false;
    this.shakeAnimation_3 = false;
    this.shakeAnimation_4 = false;
    this.tadaAnimation_1 = false;
    this.tadaAnimation_2 = false;
    this.tadaAnimation_3 = false;
    this.tadaAnimation_4 = false;
    this.zoomAnimation = false;
    this.boardAnimation_1 = 'in';
    this.boardAnimation_2 = 'in';
    this.boardAnimation_3 = 'in';
    this.boardAnimation_4 = 'in';
    this.smiley_true_1 = 'out';
    this.smiley_true_2 = 'out';
    this.smiley_true_3 = 'out';
    this.smiley_true_4 = 'out';
    this.smiley_true_5 = 'out';
    this.smiley_false_1 = 'out';
    this.smiley_false_2 = 'out';
    this.smiley_false_3 = 'out';
    this.smiley_false_4 = 'out';

    if (!_data || !_data.storage || _data.storage.length === 0) {
      this._router.navigate(['']);
    } else {
      _data.storage.forEach(element => {
        this._selectedTables.push(element);
      });
      _data.storage = [];
      this.createNewGame(true);
    }
  }

  ngOnDestroy(): void {
    if (this._timer && this._timer.subscription) {
      this._timer.subscription.unsubscribe();
    }
  }

  /**
   * PRIVATE METHODS
   **/
  protected createNewGame(newGame: boolean): void {
    if (newGame === true) {
      this._game = new Game(this._selectedTables, this._gameType);
    }
    this._incorrectAnswersAmount = 0;
    this._correctAnswersAmount = 0;
    this._currentTaskNumber = 0;
    this._points = 0;
    this._currentTask = this._game.tasks[this._currentTaskNumber];
    this._timer = new Timer(this._game.tasks.length, this._gameType);
    this._timer.subscription = this._timer.onTimesUp().pipe().subscribe(result => {
      this._timer.subscription.unsubscribe();
      this.showGameResults(100);
    });
    this._showResults = false;
    this._showTask = true;
    this._timer.start();
  }

  private correctAnswer(result: number, divId: string): void {
    this._viewState = ViewState.CORRECT;
    this._taskProgress = (this._currentTaskNumber + 1) / this._game.tasks.length * 100;
    this._correctAnswersAmount = this._correctAnswersAmount + 1;
    if (this._gameType === GameType.TASK) {
      this._points = this._points + this.POINTS_PER_TASK;
    } else {
      this._points = this._points + 1;
    }
    this.showSmiley(true);
    this._shoot.play();
    switch(divId) {
      case 'information-board-1': {
        this.tadaAnimation_1 = true;
        this.boardAnimation_2 = 'out';
        this.boardAnimation_3 = 'out';
        this.boardAnimation_4 = 'out';
      } break;
      case 'information-board-2': {
        this.tadaAnimation_2 = true;
        this.boardAnimation_1 = 'out';
        this.boardAnimation_3 = 'out';
        this.boardAnimation_4 = 'out';
      } break;
      case 'information-board-3': {
        this.tadaAnimation_3 = true;
        this.boardAnimation_1 = 'out';
        this.boardAnimation_2 = 'out';
        this.boardAnimation_4 = 'out';
      } break;
      case 'information-board-4': {
        this.tadaAnimation_4 = true;
        this.boardAnimation_1 = 'out';
        this.boardAnimation_2 = 'out';
        this.boardAnimation_3 = 'out';
      } break;
    }
  }

  private createRandomNumber(max: number): number {
    return RandomNumberService.getRandomNumber(max);
  }

  private hideAllSmileys(): void {
    this.smiley_true_1 = 'out';
    this.smiley_true_2 = 'out';
    this.smiley_true_3 = 'out';
    this.smiley_true_4 = 'out';
    this.smiley_true_5 = 'out';
    this.smiley_false_1 = 'out';
    this.smiley_false_2 = 'out';
    this.smiley_false_3 = 'out';
    this.smiley_false_4 = 'out';
  }

  private incorrectAnswer(divId: string): void {
    this._viewState = ViewState.INCORRECT;
    this._incorrectAnswersAmount = this._incorrectAnswersAmount + 1;
    this.showSmiley(false);
    this._fart.play();
    switch(divId) {
      case 'information-board-1': {
        this.shakeAnimation_1 = true;
      } break;
      case 'information-board-2': {
        this.shakeAnimation_2 = true;
      } break;
      case 'information-board-3': {
        this.shakeAnimation_3 = true;
      } break;
      case 'information-board-4': {
        this.shakeAnimation_4 = true;
      } break;
    }
  }

  private reset(): void {
    this.hideAllSmileys();
    this.showAllBoards();
  }

  private showSmiley(type: boolean) {
    if (type === true) {
      let random = this.createRandomNumber(5);
      switch(random) {
        case 1: {
          this.smiley_true_1 = 'in';
        } break;
        case 2: {
          this.smiley_true_2 = 'in';
        } break;
        case 3: {
          this.smiley_true_3 = 'in';
        } break;
        case 4: {
          this.smiley_true_4 = 'in';
        } break;
        case 5: {
          this.smiley_true_5 = 'in';
        } break;
        default: {
          console.error('Ungültige Zufallszahl: ' + random);
        }
      }
    } else {
      let random = this.createRandomNumber(4);
      switch(random) {
        case 1: {
          this.smiley_false_1 = 'in';
        } break;
        case 2: {
          this.smiley_false_2 = 'in';
        } break;
        case 3: {
          this.smiley_false_3 = 'in';
        } break;
        case 4: {
          this.smiley_false_4 = 'in';
        } break;
        default: {
          console.error('Ungültige Zufallszahl: ' + random);
        }
      }
    }
  }

  private showAllBoards(): void {
    this.boardAnimation_1 = 'in';
    this.boardAnimation_2 = 'in';
    this.boardAnimation_3 = 'in';
    this.boardAnimation_4 = 'in';
  }

  /**
   * PROTECTED METHODS
   **/
  protected showTask(): boolean {
    if (this._showTask === true && this._showResults === false) {
      return true;
    }
    return false;
  }

  protected onRestart(): void {
    this.createNewGame(false);

  }
  protected onExit(): void {
    this._router.navigate(['']);
  }

  protected onHit(decision: Decision): void {
    if (this._viewState !== ViewState.VOID) {
      return;
    }

    let correctResult;
    if (this._currentTask.resultProposal_1.correct === true) {
      correctResult = this._currentTask.resultProposal_1;
    } else if (this._currentTask.resultProposal_2.correct === true) {
      correctResult = this._currentTask.resultProposal_2;
    } else if (this._currentTask.resultProposal_3.correct === true) {
      correctResult = this._currentTask.resultProposal_3;
    } else if (this._currentTask.resultProposal_4.correct === true) {
      correctResult = this._currentTask.resultProposal_4;
    } else {
      console.error('Das richtige Ergebnis wurde nicht gefunden!');
      return;
    }

    if (correctResult?.value === decision.result) {
      this.correctAnswer(decision.result, decision.divId);
    } else {
      this.incorrectAnswer(decision.divId);
    }

    setTimeout( () => {
      this.reset();
      this.shakeAnimation_1 = false;
      this.shakeAnimation_2 = false;
      this.shakeAnimation_3 = false;
      this.shakeAnimation_4 = false;
      this.tadaAnimation_1 = false;
      this.tadaAnimation_2 = false;
      this.tadaAnimation_3 = false;
      this.tadaAnimation_4 = false;

      if (this._viewState === ViewState.CORRECT) {

        if (this._currentTaskNumber < this._game.tasks.length -1) {
          this._currentTaskNumber = this._currentTaskNumber + 1;
          this._currentTask = this._game.tasks[this._currentTaskNumber];
        } else {
          if (this._gameType === GameType.TASK) {
            this.showGameResults(2);
          } else {
            this._game.shuffleTheTasks();
            this._currentTaskNumber = 0;
            this._currentTask = this._game.tasks[this._currentTaskNumber];
          }
        }

        this._viewState = ViewState.VOID;
        this.zoomAnimation = true;
        setTimeout( () => {
          this.zoomAnimation = false;
        }, 1000 );
      } else {
        this._viewState = ViewState.VOID;
      }
    }, 1500 );
  }

  protected showGameResults(val: number): void {
    console.log('showGameResults: ' + val);
    this._showTask = false;
    this._showResults = true;
  }

  /**
   * GETTER
   **/
  get timeProgress(): number {
    if (this._timer) {
      return this._timer.timeProgress;
    }
    return 0;
  }

  get timeLeft(): number {
    if (this._timer) {
      return this._timer.timeLeft;
    }
    return 0;
  }

  get correctAnswersAmount(): number {
    return this._correctAnswersAmount;
  }

  get incorrectAnswersAmount(): number {
    return this._incorrectAnswersAmount;
  }
}
