import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartHorasPresencialesComponent } from './line-chart-horas-presenciales.component';

describe('LineChartHorasPresencialesComponent', () => {
  let component: LineChartHorasPresencialesComponent;
  let fixture: ComponentFixture<LineChartHorasPresencialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartHorasPresencialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartHorasPresencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
