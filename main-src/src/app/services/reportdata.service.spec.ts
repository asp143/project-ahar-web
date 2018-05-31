import { TestBed, inject } from '@angular/core/testing';

import { ReportdataService } from './reportdata.service';

describe('ReportdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportdataService]
    });
  });

  it('should be created', inject([ReportdataService], (service: ReportdataService) => {
    expect(service).toBeTruthy();
  }));
});
