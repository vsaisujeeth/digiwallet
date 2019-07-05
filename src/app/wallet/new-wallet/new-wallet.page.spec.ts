import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWalletPage } from './new-wallet.page';

describe('NewWalletPage', () => {
  let component: NewWalletPage;
  let fixture: ComponentFixture<NewWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWalletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
