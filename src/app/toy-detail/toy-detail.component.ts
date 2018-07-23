import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Toy }         from '../toy';
import { ToyService }  from '../toy.service';

@Component({
  selector: 'app-toy-detail',
  templateUrl: './toy-detail.component.html',
  styleUrls: [ './toy-detail.component.css' ]
})
export class ToyDetailComponent implements OnInit {
  @Input() toy: Toy;

  constructor(
    private route: ActivatedRoute,
    private toyService: ToyService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getToy();
  }

  getToy(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.toyService.getToy(id)
      .subscribe(toy => this.toy = toy);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.toyService.updateToy(this.toy)
      .subscribe(() => this.goBack());
  }
}