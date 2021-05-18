export class Decision {

  constructor(private _result: number, private _divId: string) {
    // NOOP
  }

  /** GETTER */
  get result(): number {
    return this._result;
  }

  get divId(): string {
    return this._divId;
  }
}
