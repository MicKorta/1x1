export class Result {
  private _correct: boolean;
  private _value: number;

  constructor() {
    this._value = -1;
    this._correct = false;
  }

  /**
   * GETTER
   **/
  get correct(): boolean {
    return this._correct;
  }

  get value(): number {
    return this._value;
  }

  /**
   * SETTER
   **/
  set correct(value: boolean) {
    this._correct = value;
  }

  set value(v: number) {
    this._value = v;
  }
}
