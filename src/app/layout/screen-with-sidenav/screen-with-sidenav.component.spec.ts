import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenWithSidenavComponent } from './screen-with-sidenav.component';

describe('ScreenWithSidenavComponent', () => {
  let component: ScreenWithSidenavComponent;
  let fixture: ComponentFixture<ScreenWithSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenWithSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenWithSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
