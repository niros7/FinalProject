import { TestBed, inject } from '@angular/core/testing';

import { SearchTripsService } from './search-trips.service';

describe('SearchTripsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchTripsService]
    });
  });

  it('should be created', inject([SearchTripsService], (service: SearchTripsService) => {
    expect(service).toBeTruthy();
  }));
});
