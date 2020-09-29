import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService: jasmine.SpyObj<MatDialogRef<BookComponent>>;
  let notificationService: jasmine.SpyObj<MatSnackBar>;

  const el = (selector) => fixture.nativeElement.querySelector(selector);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [BookComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DataService, useFactory: () => spyOnClass(DataService) },
        { provide: MatDialogRef, useFactory: () => spyOnClass(MatDialogRef) },
        { provide: MatSnackBar, useFactory: () => spyOnClass(MatSnackBar) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.get(MAT_DIALOG_DATA);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    dialogService = TestBed.get(MatDialogRef);
    notificationService = TestBed.get(MatSnackBar);

    const homes = require('../../../assets/homes.json');
    dialogData.home = homes[0];
    fixture.detectChanges();
  });

  it('should show title', () => {
    expect(el('[data-test="title"]').textContent).toContain(
      'Book IJ View Apartment'
    );
  });

  it('should show price', () => {
    // TODO:
    expect(false).toBe(true);
  });

  it('should show check in date field', () => {
    // TODO:
    expect(false).toBe(true);
  });

  it('should show check out date field', () => {
    expect(el('[data-test="check-out"]')).toBeTruthy();
  });

  it('should show total', () => {
    // TODO:
    // user enters check in date: 12/20/19
    // user enter check out date: 12/23/19
    // assert that the total shows 3x125=375
    expect(el('[data-test="total"]').textContent).toContain('Total: €975');
  });

  it('should show -- for total when dates are invalid', () => {
    // TODO:
    expect(el('[data-test="total"]').textContent).toContain('Total: --');
  });

  it('should book home after clicking the Book button', () => {
    dataService.bookHome$.and.returnValue(of(null));

    // TODO:

    // user enters check in date: 12/20/19
    // user enter check out date: 12/23/19
    // click in the Book

    // assert that the data service was used to book the home
    expect(dataService.bookHome$).toHaveBeenCalled();
  });

  it('should close the dialog and show notification after clicking Book button', () => {
    dataService.bookHome$.and.returnValue(of(null));

    // TODO:

    // user enters check in date: 12/20/19
    // user enter check out date: 12/23/19
    // click in the Book

    expect(dialogService.close).toHaveBeenCalled();
    expect(notificationService.open).toHaveBeenCalled();
  });
});
