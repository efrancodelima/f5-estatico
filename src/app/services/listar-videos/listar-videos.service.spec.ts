import { TestBed } from '@angular/core/testing';

import { ListarVideosService } from './listar-videos.service';

describe('ListarVideosService', () => {
  let service: ListarVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
