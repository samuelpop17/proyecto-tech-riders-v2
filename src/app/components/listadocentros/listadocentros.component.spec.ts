import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadocentrosComponent } from './listadocentros.component';

describe('ListadocentrosComponent', () => {
  let component: ListadocentrosComponent;
  let fixture: ComponentFixture<ListadocentrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadocentrosComponent]
    });
    fixture = TestBed.createComponent(ListadocentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
