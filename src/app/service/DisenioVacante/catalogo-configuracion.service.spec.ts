import { TestBed, inject } from '@angular/core/testing';

import { CatalogoConfiguracionService } from './catalogo-configuracion.service';

describe('CatalogoConfiguracionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogoConfiguracionService]
    });
  });

  it('should be created', inject([CatalogoConfiguracionService], (service: CatalogoConfiguracionService) => {
    expect(service).toBeTruthy();
  }));
});
