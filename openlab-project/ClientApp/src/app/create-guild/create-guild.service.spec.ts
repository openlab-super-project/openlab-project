import { TestBed } from '@angular/core/testing';
import { CreateGuildService } from './create-guild.service';

describe('CreateGuildService', () => {
  let service: CreateGuildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGuildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
