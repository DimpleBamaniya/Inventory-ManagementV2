import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTestingComponent } from './unit-testing.component';

describe('UnitTestingComponent', () => {
  let component: UnitTestingComponent;
  let fixture: ComponentFixture<UnitTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
