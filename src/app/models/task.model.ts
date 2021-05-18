import { RandomNumberService } from '../services/random.service';
import { Result } from './result.model';

export class Task {

  private _resultProposal_1!: Result;
  private _resultProposal_2!: Result;
  private _resultProposal_3!: Result;
  private _resultProposal_4!: Result;

  constructor(private _id: number, private _first: number, private _second: number) {
    let random = this.getRandom();
    this._resultProposal_1 = new Result();
    this._resultProposal_2 = new Result();
    this._resultProposal_3 = new Result();
    this._resultProposal_4 = new Result();
    switch(random) {
      case 1: {
        this._resultProposal_1.correct = true;
        this._resultProposal_1.value = this._first * this._second;
      } break;
      case 2: {
        this._resultProposal_2.correct = true;
        this._resultProposal_2.value = this._first * this._second;
      } break;
      case 3: {
        this._resultProposal_3.correct = true;
        this._resultProposal_3.value = this._first * this._second;
      } break;
      case 4: {
        this._resultProposal_4.correct = true;
        this._resultProposal_4.value = this._first * this._second;
      } break;
      default: {
        console.error('Unbekanntes ResultProposal mit der Nummer: ' + random);
      }
    }
  }

  /**
   * GETTER
   **/
  get id(): number {
    return this._id;
  }

  get first(): number {
    return this._first;
  }

  get second(): number {
    return this._second;
  }

  get resultProposal_1(): Result {
    return this._resultProposal_1;
  }

  get resultProposal_2(): Result {
    return this._resultProposal_2;
  }

  get resultProposal_3(): Result {
    return this._resultProposal_3;
  }

  get resultProposal_4(): Result {
    return this._resultProposal_4;
  }

  /**
   * SETTER
   **/
  set id(value: number) {
    this._id = value;
  }

  /**
   * PRIVATE METHODS
  **/
  private getRandom(): number {
    return RandomNumberService.getRandomNumber(4);
  }
}
