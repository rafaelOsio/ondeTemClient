import { TestBed, inject } from '@angular/core/testing';

import { EstabelecimentoService } from './estabelecimento.service';

describe('EstabelecimentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstabelecimentoService]
    });
  });

  it('should be created', inject([EstabelecimentoService], (service: EstabelecimentoService) => {
    expect(service).toBeTruthy();
  }));
});
