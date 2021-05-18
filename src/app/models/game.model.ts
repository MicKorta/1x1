import { GameType } from './../enums/game-type.enum';
import { Task } from './task.model';
import { RandomNumberService } from '../services/random.service';

export class Game {

  private _tasks: Task[];

  constructor(values: Number[], gameType: GameType) {
    this._tasks = [];
    if (gameType === GameType.TASK) {
      values.forEach(item => {
        this.createTaskContainer(item, values.length);
      });
    } else {
      values.forEach(item => {
        this.createTimeContainer(item);
      });
    }

    this.sort();
    let optimized = true;
    while(optimized === true) {
      optimized = this.removeDoubleEntries();
    }
  }

  /**
   * GETTER
   **/
  get tasks(): Task[] {
    return this._tasks;
  }

  /**
   * PUBLIC METHODS
   **/
  public shuffleTheTasks(): void {
    this._tasks.forEach(item => {
      item.id = this.createId();
    });
    this.sort();
  }

  /**
   * PRIVATE METHODS
   **/
  private removeDoubleEntries(): boolean {
    let result = false;
    let previousSecond = -1;
    let optimized: Task[] = [];
    this._tasks.forEach(item => {
      if (item.second !== previousSecond) {
        optimized.push(item);
        previousSecond = item.second;
      } else {
        let task = new Task(this.createId(), item.first, RandomNumberService.getRandomNumber(10))
        task = this.createResultProposals(task);
        optimized.push(task);
        result = true;
      }
    });
    this._tasks = optimized;
    return result;
  }

  private createId(): number {
    return RandomNumberService.getRandomNumber(100000);
  }

  //    1 = 2 min = 24 Aufgaben, jeweils 24
  //    2 = 3 min = 36 Aufgaben, jeweils 18
  //    3 = 4 min = 48 Aufgaben, jeweils 16
  //    4 = 5 min = 60 Aufgaben, jeweils 15
  //    5 = 5 min = 60 Aufgaben, jeweils 12
  //    6 = 5 min = 60 Aufgaben, jeweils 10
  //    7 = 5 min = 63 Aufgaben, jeweils  9
  //    8 = 5 min = 64 Aufgaben, jeweils  8
  //    9 = 5 min = 63 Aufgaben, jeweils  7
  //   10 = 5 min = 60 Aufgaben, jeweils  6
  private createTaskContainer(currentFactor: Number, selectedLength: number): void {
    switch(selectedLength) {
      case 1: {
        this.createTasks(24, currentFactor);
      } break;
      case 2: {
        this.createTasks(18, currentFactor);
      } break;
      case 3: {
        this.createTasks(16, currentFactor);
      } break;
      case 4: {
        this.createTasks(15, currentFactor);
      } break;
      case 5: {
        this.createTasks(12, currentFactor);
      } break;
      case 6: {
        this.createTasks(10, currentFactor);
      } break;
      case 7: {
        this.createTasks(9, currentFactor);
      } break;
      case 8: {
        this.createTasks(8, currentFactor);
      } break;
      case 9: {
        this.createTasks(7, currentFactor);
      } break;
      case 10: {
        this.createTasks(6, currentFactor);
      } break;
      default: {
        console.error('Unbekannte Länge der selectieren Zahlen: ' + selectedLength);
      }
    }
  }

  private createTimeContainer(currentFactor: Number): void {
      this.createTasks(10, currentFactor);
  }

  private createTasks(amount: number, currentFactor: Number) {
    let j = 1;
    for (let i = 0; i < amount; i++) {
      let task = new Task(this.createId(), Number(currentFactor), j);
      task = this.createResultProposals(task);
      this._tasks.push(task);
      j = j + 1;
      if (j > 10) {
        j = 1;
      }
    }
  }

  private createResultProposals(task: Task): Task {
    let correctResult = -1;
    let correctResultNumber = -1;
    if (task.resultProposal_1.correct === true) {
      correctResultNumber = 1;
      correctResult = task.resultProposal_1.value;
    } else if (task.resultProposal_2.correct === true) {
      correctResultNumber = 2;
      correctResult = task.resultProposal_2.value;
    } else if (task.resultProposal_3.correct === true) {
      correctResultNumber = 3;
      correctResult = task.resultProposal_3.value;
    } else {
      correctResultNumber = 4;
      correctResult = task.resultProposal_4.value;
    }

    while(this.doubleResultValues(task)) {
      task = this.createResultValues(task, correctResult, correctResultNumber);
    }
    return task;
  }

  private doubleResultValues(task: Task): boolean {
    if (task.resultProposal_1.value === task.resultProposal_2.value ||
        task.resultProposal_1.value === task.resultProposal_3.value ||
        task.resultProposal_1.value === task.resultProposal_4.value ||
        task.resultProposal_2.value === task.resultProposal_3.value ||
        task.resultProposal_2.value === task.resultProposal_4.value ||
        task.resultProposal_3.value === task.resultProposal_4.value) {
          return true;
        }
    return false;
  }

  private createResultValues(task: Task, correctResult: number, correctResultNumber: number): Task {

    let result_1 = this.createFirstResultProposal(task, correctResult);
    let result_2 = this.createSecondResultProposal(task, correctResult);
    let result_3 = this.createThirdResultProposal(task, correctResult);

    switch(correctResultNumber) {
      case 1: {
        task.resultProposal_2.value = result_1;
        task.resultProposal_3.value = result_2;
        task.resultProposal_4.value = result_3;
      } break;
      case 2: {
        task.resultProposal_1.value = result_1;
        task.resultProposal_3.value = result_2;
        task.resultProposal_4.value = result_3;
      } break;
      case 3: {
        task.resultProposal_1.value = result_1;
        task.resultProposal_2.value = result_2;
        task.resultProposal_4.value = result_3;
      } break;
      case 4: {
        task.resultProposal_1.value = result_1;
        task.resultProposal_2.value = result_2;
        task.resultProposal_3.value = result_3;
      } break;
      default: {
        console.error('Unbekannte CorrectResultNumber: ' + correctResultNumber);
      }
    }

    return task;
  }

  private createFirstResultProposal(task: Task, correctResult: number): number {
    let result = correctResult;
    while (result === correctResult) {
      let offset1 = RandomNumberService.getRandomNumber(7);
      if (result - (offset1 * task.first) > 0) {
        result = result - (offset1 * task.first);
        let offset2 = RandomNumberService.getRandomNumber(2);
        if (result - (offset2 * task.first) > 0 ) {
          result = result - (offset2 * task.first);
        } else if (result + (offset2 * task.first) <= task.first * 11 ) {
          result = result + (offset2 * task.first);
        }
      } else if (result + (offset1 * task.first) <= (task.first * 11)) {
        result = result + (offset1 * task.first);
        let offset2 = RandomNumberService.getRandomNumber(2);
        if (result - (offset2 * task.first) > 0 ) {
          result = result - (offset2 * task.first);
        } else if (result + (offset2 * task.first) <= task.first * 11 ) {
          result = result + (offset2 * task.first);
        }
      }
    }

    let offset3 = RandomNumberService.getRandomNumber(2);
    if (offset3 === 1) {
      let temp = result;
      while (result === temp) {
        let offset4 = RandomNumberService.getRandomNumber(3);
        if (result - (offset4 * task.second) > 0) {
          result = result - (offset4 * task.second);
        } else if (result + (offset4 * task.second) <= task.first * 11) {
          result = result + (offset4 * task.second);
        }
      }
    }

    return result;
  }

  private createSecondResultProposal(task: Task, correctResult: number): number {
    let result = correctResult;
    while (result === correctResult) {
      let offset1 = RandomNumberService.getRandomNumber(7);
      if (result + (offset1 * task.first) <= (task.first * 11)) {
        result = result + (offset1 * task.first);
        let offset2 = RandomNumberService.getRandomNumber(2);
        if (result - (offset2 * task.first) > 0 ) {
          result = result - (offset2 * task.first);
        } else if (result + (offset2 * task.first) <= task.first * 11 ) {
          result = result + (offset2 * task.first);
        }
      } else if (result - (offset1 * task.first) > 0) {
        result = result - (offset1 * task.first);
        let offset2 = RandomNumberService.getRandomNumber(2);
        if (result - (offset2 * task.first) > 0 ) {
          result = result - (offset2 * task.first);
        } else if (result + (offset2 * task.first) <= task.first * 11 ) {
          result = result + (offset2 * task.first);
        }
      }
    }

    let offset3 = RandomNumberService.getRandomNumber(2);
    if (offset3 === 1) {
      let temp = result;
      while (result === temp) {
        let offset4 = RandomNumberService.getRandomNumber(3);
        if (result + (offset4 * task.second) <= task.first * 11) {
          result = result + (offset4 * task.second);
        } else if (result - (offset4 * task.second) > 0) {
          result = result - (offset4 * task.second);
        }
      }
    }

    return result;
  }

  private createThirdResultProposal(task: Task, correctResult: number): number {
    let result = correctResult;

    let temp = result;
    while (result === temp) {
      let offset4 = RandomNumberService.getRandomNumber(3);
      if (result + (offset4 * task.second) <= task.first * 11) {
        result = result + (offset4 * task.second);
      } else if (result - (offset4 * task.second) > 0) {
        result = result - (offset4 * task.second);
      }
    }
    return result;
  }

  private sort(): void {
    let sortedArray: Task[] = this._tasks.sort((n1,n2) => {
      if (n1.id > n2.id) {
          return 1;
      }

      if (n1.id < n2.id) {
          return -1;
      }

      return 0;
    });
    this._tasks = sortedArray;
  }
}
