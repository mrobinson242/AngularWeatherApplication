import { WeeklyTabComponent } from './weeklyTab.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('WeeklyTabComponent', function ()
{
  let component: WeeklyTabComponent;
  let fixture: ComponentFixture<WeeklyTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyTabComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => expect(component).toBeTruthy() );
});
