import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverflowComponent } from './coverflow.component';

describe('CoverflowComponent', () => {
  let component: CoverflowComponent;
  let fixture: ComponentFixture<CoverflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
