import { FavoriteViewComponent } from './favoriteView.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TabViewComponent', function ()
{
  let component: FavoriteViewComponent;
  let fixture: ComponentFixture<FavoriteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteViewComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => expect(component).toBeTruthy() );
});
