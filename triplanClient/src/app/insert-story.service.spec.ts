import { TestBed, inject } from '@angular/core/testing';

import { InsertStoryService } from './insert-story.service';

describe('InsertStoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsertStoryService]
    });
  });

  it('should be created', inject([InsertStoryService], (service: InsertStoryService) => {
    expect(service).toBeTruthy();
  }));
});
