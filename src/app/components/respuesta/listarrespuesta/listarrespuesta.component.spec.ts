import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarrespuestaComponent } from './listarrespuesta.component';

describe('ListarrespuestaComponent', () => {
  let component: ListarrespuestaComponent;
  let fixture: ComponentFixture<ListarrespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarrespuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarrespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
