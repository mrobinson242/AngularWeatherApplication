import { TestBed, inject } from '@angular/core/testing';

import { DarkSkyService } from './darkSky.service';

describe('DarkSkyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DarkSkyService]
    });
  });

  it('should be created', inject([DarkSkyService], (service: DarkSkyService) => {
    expect(service).toBeTruthy();
  }));
});
