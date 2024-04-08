import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTareaComponent } from './agregar-tarea.component';

describe('AgregarTareaComponent', () => {
  let component: AgregarTareaComponent;
  let fixture: ComponentFixture<AgregarTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
