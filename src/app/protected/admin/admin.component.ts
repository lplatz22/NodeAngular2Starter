import { Component, OnInit, ViewChild, Pipe, PipeTransform, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective, AlertModule } from 'ng2-bootstrap';


@Component({
	moduleId: module.id,
	selector: 'admin',
	templateUrl: './admin.component.html'
	// styleUrls: ['./app.component.css']
})
export class AdminComponent {
	private users: any[] = [];
	private tasks: any[] = [];
	private error: string;

	private sort: string;
	private invert: number = 1;

	private filterValue: string;

	// private sortType: string = "user.lastName";

	constructor(private router: Router) {

	}
}