import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseApi } from './base-api';

describe('BaseApi', () => {
  let component: BaseApi;
  let fixture: ComponentFixture<BaseApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseApi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
