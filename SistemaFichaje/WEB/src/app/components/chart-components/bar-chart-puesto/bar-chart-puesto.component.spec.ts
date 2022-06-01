import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartPuestoComponent } from './bar-chart-puesto.component';

describe('BarChartPuestoComponent', () => {
  let component: BarChartPuestoComponent;
  let fixture: ComponentFixture<BarChartPuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartPuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
