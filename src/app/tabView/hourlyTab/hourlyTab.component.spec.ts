import { HourlyTabComponent } from './hourlyTab.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('HourlyTabComponent', function ()
{
  let component: HourlyTabComponent;
  let fixture: ComponentFixture<HourlyTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyTabComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => expect(component).toBeTruthy() );
});
