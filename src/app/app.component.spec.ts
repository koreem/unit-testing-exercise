import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockComponent } from "./utils/mock-component";
import { DataService } from "./services/data.service";
import { of } from "rxjs";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent({ selector: "app-header" }),
        MockComponent({ selector: "app-homes" }),
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should get homes on init", () => {
    spyOn(dataService, "getHomes$").and.returnValue(of([]));
    component.ngOnInit();
    expect(dataService.getHomes$).toHaveBeenCalled();
  });
});
