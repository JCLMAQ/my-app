import { TestBed } from '@angular/core/testing';
import {
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { UserDataService } from './user-data.service';

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        EntityCollectionServiceElementsFactory,
        UserDataService
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(UserDataService)
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
