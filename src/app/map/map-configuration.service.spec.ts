import {TestBed} from '@angular/core/testing';

import {MapConfigurationService} from './map-configuration.service';
import {Territory} from '../api/territory';
import {MapColor} from './map-color';
import {exitCodeFromResult} from '@angular/compiler-cli';

describe('MapConfigurationService', () => {
  let service: MapConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
