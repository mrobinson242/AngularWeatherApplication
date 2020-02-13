import { CurrentTabComponent } from './currentTab.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('CurrentTabComponent', function ()
{
  let component: CurrentTabComponent;
  let fixture: ComponentFixture<CurrentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTabComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => expect(component).toBeTruthy() );
});
