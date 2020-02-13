import { ProgressBarComponent } from './progressBar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('ProgressBarComponent', function ()
{
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => expect(component).toBeTruthy() );
});
