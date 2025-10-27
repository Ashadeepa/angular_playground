import { TestBed } from '@angular/core/testing';

import { WasmLoaderService } from './wasm-loader.service';

describe('WasmLoaderService', () => {
  let service: WasmLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WasmLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
