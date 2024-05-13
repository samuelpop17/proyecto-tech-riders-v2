import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosempresaComponent } from './listadosempresa.component';

describe('ListadosempresaComponent', () => {
  let component: ListadosempresaComponent;
  let fixture: ComponentFixture<ListadosempresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadosempresaComponent]
    });
    fixture = TestBed.createComponent(ListadosempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
