import { TestBed } from '@angular/core/testing';

import { AgregarTareaService } from './agregar-tarea.service';

describe('AgregarTareaService', () => {
  let service: AgregarTareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarTareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
