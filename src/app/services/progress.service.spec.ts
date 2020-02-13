import { TestBed, inject } from '@angular/core/testing';

import { ProgressService } from './progress.service';

describe('ProgressBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressService]
    });
  });

  it('should be created', inject([ProgressService], (service: ProgressService) => {
    expect(service).toBeTruthy();
  }));
});
