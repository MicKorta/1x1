import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Version } from '../../models/version.model';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css'],
})
export class FooterComponent {

	private _version!: Version;

	/**
	 * INITIALIZATION
	 */
	constructor(private _router: Router) {
    this._version = new Version();
    this._version.client = environment.clientVersion;
		// NOOP
	}

	/**
	 * PUBLIC-METHODS
	 */
  public home(): void {
    const element = document.querySelector('#pageTop');
		if (element) {
			element.scrollIntoView();
		}
		this._router.navigate(['']);
  }

	public kontakt(): void {
		const element = document.querySelector('#pageTop');
		if (element) {
			element.scrollIntoView();
		}
		this._router.navigate(['kontakt']);
	}

	public nutzungsbedingungen(): void {
		const element = document.querySelector('#pageTop');
		if (element) {
			element.scrollIntoView();
		}
		this._router.navigate(['nutzungsbedingungen']);
	}

	public agb(): void {
		const element = document.querySelector('#pageTop');
		if (element) {
			element.scrollIntoView();
		}
		this._router.navigate(['agb']);
	}

	public impressum(): void {
		const element = document.querySelector('#pageTop');
		if (element) {
			element.scrollIntoView();
		}
		this._router.navigate(['impressum']);
	}

	public datenschutz(): void {
		const element = document.querySelector('#pageTop');
		if (element) {
			element.scrollIntoView();
		}
		this._router.navigate(['datenschutz']);
	}

	/**
	 * GETTER
	 */
	get version(): Version {
		return this._version;
	}
}
