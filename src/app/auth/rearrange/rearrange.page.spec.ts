import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RearrangePage } from './rearrange.page';

describe('RearrangePage', () => {
  let component: RearrangePage;
  let fixture: ComponentFixture<RearrangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RearrangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RearrangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
