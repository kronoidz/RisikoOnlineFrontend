import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLegendComponent } from './map-legend.component';

describe('PlayerListComponent', () => {
  let component: MapLegendComponent;
  let fixture: ComponentFixture<MapLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
