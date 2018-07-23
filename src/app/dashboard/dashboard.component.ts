import { Component, OnInit } from '@angular/core';
import { Toy } from '../toy';
import { ToyService } from '../toy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  toys: Toy[] = [];

  constructor(private toyService: ToyService) { }

  ngOnInit() {
    this.getToys();
  }

  getToys(): void {
    this.toyService.getToys()
      .subscribe(toys => this.toys = toys.slice(1, 5));
  }
}
