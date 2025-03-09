import { TestBed } from '@angular/core/testing';

import { EnviarVideosService } from './enviar-videos.service';

describe('EnviarVideosService', () => {
  let service: EnviarVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
