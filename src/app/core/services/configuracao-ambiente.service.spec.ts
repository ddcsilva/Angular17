import { TestBed } from '@angular/core/testing';

import { ConfiguracaoAmbienteService } from './configuracao-ambiente.service';

describe('ConfiguracaoAmbienteService', () => {
  let service: ConfiguracaoAmbienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracaoAmbienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
