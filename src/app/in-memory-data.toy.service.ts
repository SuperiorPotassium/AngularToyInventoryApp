import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ToyInMemoryDataService implements InMemoryDbService {
  createDb() {
    const toys = [
      { id: 21, toyName: 'IndoRaptor', toyCategory: 'Dinosaur' },
      { id: 22, toyName: 'BlackPanther', toyCategory: 'ActionFigure' },
      { id: 23, toyName: 'F250', toyCategory: 'DieCastCar' },
      { id: 24, toyName: 'Lego JW-Fallen Kingdom', toyCategory: 'Lego' },
      { id: 25, toyName: 'Megatron', toyCategory: 'Transformer' },
      { id: 26, toyName: 'Dimorphodon', toyCategory: 'Dinosaur' },
      { id: 27, toyName: 'Triceratops', toyCategory: 'Dinosaur' },
      { id: 28, toyName: 'Lego Racecar', toyCategory: 'Lego' },
      { id: 29, toyName: 'Tyrannosaurus Rex', toyCategory: 'Dinosaur' },
      { id: 30, toyName: 'Optimus Prime', toyCategory: 'Transformer' }
    ];
    return {toys};
  }
}
