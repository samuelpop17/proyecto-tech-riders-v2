import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPeticionesAdminComponent } from './panel-peticiones-admin.component';

describe('PanelPeticionesAdminComponent', () => {
  let component: PanelPeticionesAdminComponent;
  let fixture: ComponentFixture<PanelPeticionesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelPeticionesAdminComponent]
    });
    fixture = TestBed.createComponent(PanelPeticionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
