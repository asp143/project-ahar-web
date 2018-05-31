import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartreportComponent } from './chartreport.component';

describe('ChartreportComponent', () => {
  let component: ChartreportComponent;
  let fixture: ComponentFixture<ChartreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
