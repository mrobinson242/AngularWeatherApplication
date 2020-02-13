import { TestBed, inject } from '@angular/core/testing';

import { StateSealService } from './stateSeal.service';

describe('StateSealService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateSealService]
    });
  });

  it('should be created', inject([StateSealService], (service: StateSealService) => {
    expect(service).toBeTruthy();
  }));
});
