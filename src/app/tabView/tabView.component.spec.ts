import { TabViewComponent } from './tabView.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TabViewComponent', function ()
{
  let component: TabViewComponent;
  let fixture: ComponentFixture<TabViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => expect(component).toBeTruthy() );
});
