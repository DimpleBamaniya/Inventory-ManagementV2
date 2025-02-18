import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableDataDialogComponent } from './dynamic-table-data-dialog.component';

describe('DynamicTableDataDialogComponent', () => {
  let component: DynamicTableDataDialogComponent;
  let fixture: ComponentFixture<DynamicTableDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTableDataDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTableDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
