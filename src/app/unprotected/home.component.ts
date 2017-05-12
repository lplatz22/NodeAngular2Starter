import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UnprotectedService, UNPROTECTED_STATUS_CODES } from './unprotected.service';

@Component({
  moduleId: module.id,
  templateUrl: './home.component.html'
  // styleUrls: ['./home.component.css']
})
export class HomeComponent {
	private loading: boolean = false;
	private error: string;
	private serverCheck: string = 'FAILED';

	constructor(private router: Router,
				private unprotectedService: UnprotectedService) {
	}

	ngOnInit() {
		this.loading = true;
		this.error = null;

		this.unprotectedService.testUnprotected().subscribe(response => {
			this.loading = false;
			this.serverCheck = response.data;
		}, error => {
			this.serverCheck = 'FAILED :(';
			this.loading = false;
			this.error = UNPROTECTED_STATUS_CODES[error.status] || UNPROTECTED_STATUS_CODES[500];
		});
	}
}
