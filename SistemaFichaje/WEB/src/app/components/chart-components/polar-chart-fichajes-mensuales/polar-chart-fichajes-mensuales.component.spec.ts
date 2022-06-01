import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarChartFichajesMensualesComponent } from './polar-chart-fichajes-mensuales.component';

describe('PolarChartFichajesMensualesComponent', () => {
  let component: PolarChartFichajesMensualesComponent;
  let fixture: ComponentFixture<PolarChartFichajesMensualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolarChartFichajesMensualesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarChartFichajesMensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
