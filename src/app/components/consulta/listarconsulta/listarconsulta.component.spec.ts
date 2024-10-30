import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarconsultaComponent } from './listarconsulta.component';

describe('ListarconsultaComponent', () => {
  let component: ListarconsultaComponent;
  let fixture: ComponentFixture<ListarconsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarconsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
