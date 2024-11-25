import { TestBed } from '@angular/core/testing';

import { FormularioLoginService } from './formulario-login.service';

describe('FormularioLoginService', () => {
  let service: FormularioLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
