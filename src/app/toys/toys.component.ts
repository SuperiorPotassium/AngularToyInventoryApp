import { Component, OnInit } from '@angular/core';

import { Toy } from '../toy';
import { ToyService } from '../toy.service';

@Component({
    selector: 'toy-entry',
    templateUrl: './toys.component.html',
    styleUrls: ['./toys.component.css']
})
export class ToysComponent implements OnInit{
    toys: Toy[];

    constructor(private toyService: ToyService) {
    }

    ngOnInit(): void {
        this.getToys();        
    }

    getToys(): void {
        this.toyService.getToys()
        .subscribe(toys => this.toys = toys);
      }
    
    add(toyName: string): void {
        toyName = toyName.trim();
        var toyCategory = ''
        if (!toyName) { return; }
        this.toyService.addToy({ toyName, toyCategory } as Toy)
          .subscribe(toy => {
            this.toys.push(toy);
          });
      }
    
      delete(toy: Toy): void {
        this.toys = this.toys.filter(t => t !== toy);
        this.toyService.deleteToy(toy).subscribe();
      }
    
    }
    
