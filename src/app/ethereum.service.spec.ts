import { TestBed } from '@angular/core/testing';

import { EthereumService } from './services/ethereum.service';

describe('EthereumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EthereumService = TestBed.get(EthereumService);
    expect(service).toBeTruthy();
  });
});
