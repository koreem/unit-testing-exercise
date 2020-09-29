import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomesComponent } from "./homes.component";
import { of } from "rxjs";
import { spyOnClass } from "jasmine-es6-spies";
import { DialogService } from "../../services/dialog.service";
import { IHome } from "../../models/home.interface";

describe("HomesComponent", () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomesComponent],
      providers: [
        { provide: DialogService, useFactory: () => spyOnClass(DialogService) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    dialogService = TestBed.get(DialogService);

    const homes: IHome[] = [
      {
        id: 0,
        title: "IJ View Apartment",
        image: "assets/amsterdam.jpg",
        location: "Amsterdam",
        price: "325",
        balcony: true,
        parking: false,
      },
      {
        id: 0,
        title: "Stylish Apartment",
        image: "assets/leeuwarden.jpg",
        location: "Leeuwarden",
        price: "125",
        balcony: false,
        parking: true,
      },
      {
        id: 0,
        title: "Canal Apartment",
        image: "assets/utrecht.jpg",
        location: "Utrecht",
        price: "225",
        balcony: true,
        parking: false,
      },
    ];

    component.homes$ = of(homes);

    fixture.detectChanges();
  });

  it("should show homes", () => {
    expect(
      fixture.nativeElement.querySelectorAll('[data-test="home"]').length
    ).toBe(3);
  });

  it("should show home info", () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
    expect(home.querySelector('[data-test="title"]').innerText).toEqual(
      "IJ View Apartment"
    );
    expect(home.querySelector('[data-test="location"]').innerText).toEqual(
      "Amsterdam"
    );
  });

  it("should show Book button", () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="book-btn"]')).toBeTruthy();
  });

  it("should use dialog service to open a dialog when clicking on Book button", () => {
    // grab the button to click
    const bookBtn = fixture.nativeElement.querySelector(
      '[data-test="home"] button'
    );
    // click the button
    bookBtn.click();
    // assert that the dialog service was used to open a dialog
    expect(dialogService.open).toHaveBeenCalled();
  });
});
