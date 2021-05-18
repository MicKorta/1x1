import { Injectable } from '@angular/core';

@Injectable()
export class Data {
  private _storage: Array<Number>;

  constructor() {
    this._storage = [];
  }

  get storage(): Array<Number> {
    return this._storage;
  }

  set storage(value: Array<Number>) {
    this._storage = value;
  }
}
