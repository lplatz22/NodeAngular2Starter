import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProtectedService, PROTECTED_STATUS_CODES } from './protected.service';

@Component({
  moduleId: module.id,
  selector: 'protected',
  templateUrl: './protected.component.html'
})
export class ProtectedComponent implements OnInit {
	private serverCheck: string = 'FAILED';
	private loading: boolean = false;
	private error: string;

	constructor(private router: Router,
				private protectedService: ProtectedService) {
	}

	ngOnInit() {
		this.loading = true;
		this.error = null;

		this.protectedService.testProtected().subscribe(response => {
			this.loading = false;
			this.serverCheck = response.data;
		}, error => {
			this.serverCheck = 'FAILED :(';
			this.loading = false;
			this.error = PROTECTED_STATUS_CODES[error.status] || PROTECTED_STATUS_CODES[500];
		});
	}
}
