import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartHorasMensualesComponent } from './pie-chart-horas-mensuales.component';

describe('PieChartHorasMensualesComponent', () => {
  let component: PieChartHorasMensualesComponent;
  let fixture: ComponentFixture<PieChartHorasMensualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartHorasMensualesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartHorasMensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
