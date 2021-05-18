export class Version {
	private _client!: string;

	get client(): string {
		return this._client;
  }

  set client(value: string) {
    this._client = value;
  }
}
