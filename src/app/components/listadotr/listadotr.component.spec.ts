import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadotrComponent } from './listadotr.component';

describe('ListadotrComponent', () => {
  let component: ListadotrComponent;
  let fixture: ComponentFixture<ListadotrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadotrComponent]
    });
    fixture = TestBed.createComponent(ListadotrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
