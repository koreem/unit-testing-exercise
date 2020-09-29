import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { IHome } from "../models/home.interface";
import { IFilter } from "../models/filter.interface";

describe("DataService", () => {
  let dataService: DataService;
  let httpClient: HttpClient;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    httpClient = TestBed.get(HttpClient);
  });

  it("should call API endpoind and return result", fakeAsync(() => {
    const spy = jasmine.createSpy("spy");

    const homes = require("../../assets/homes.json");

    spyOn(httpClient, "get").and.returnValue(of(homes));

    dataService.getHomes$().subscribe(spy);

    tick();

    expect(httpClient.get).toHaveBeenCalledWith("assets/homes.json");
    expect(spy).toHaveBeenCalledWith(homes);
  }));

  it("should filter the homes", () => {
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

    const expectedOutput: IHome[] = [
      {
        id: 0,
        title: "Stylish Apartment",
        image: "assets/leeuwarden.jpg",
        location: "Leeuwarden",
        price: "125",
        balcony: false,
        parking: true,
      },
    ];

    const filters: IFilter[] = [
      { name: "balcony", isEnabled: false },
      { name: "parking", isEnabled: true },
    ];

    expect(dataService.filteredHomesMap(homes, filters)).toEqual(
      expectedOutput
    );
  });
});
