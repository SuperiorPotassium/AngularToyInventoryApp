import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Toy } from '../toy';

@Component({
  selector: 'app-toy',
  templateUrl: './toy.component.html',
  styleUrls:  ['./toy.component.css']
})
export class ToyComponent {
  @Input() toy: Toy;
  @Output() delete = new EventEmitter();

  onDeleteClick($event): void {
    $event.stopPropagation();
    this.delete.next();
  }
}
