/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FruitService } from './fruit.service';

describe('Service: Fruit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FruitService]
    });
  });

  it('should ...', inject([FruitService], (service: FruitService) => {
    expect(service).toBeTruthy();
  }));
});
