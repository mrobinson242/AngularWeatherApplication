import { AlertBarComponent } from './alertBar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('AlertBarComponent', function ()
{
  let component: AlertBarComponent;
  let fixture: ComponentFixture<AlertBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBarComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => expect(component).toBeTruthy() );
});
