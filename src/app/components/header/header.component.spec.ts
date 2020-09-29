import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { IFilter } from '../../models/filter.interface';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    component.filters = [
      { name: 'balcony', isEnabled: false },
      { name: 'parking', isEnabled: false },
    ];

    fixture.detectChanges();
  });

  it('should show logo', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="logo"]')
    ).toBeTruthy();
  });

  it('should show search', () => {
    // TODO:
    expect(false).toBe(true);
  });

  it('should show menu', () => {
    // TODO:
    expect(false).toBe(true);
  });

  it('should emit filterClicked with the right filters when clicking on a filter', () => {
    spyOn(component.filterChanged, 'emit');

    // TODO:
    const expectedOutput = [];

    expect(component.filterChanged.emit).toHaveBeenCalledWith(expectedOutput);
  });
});
