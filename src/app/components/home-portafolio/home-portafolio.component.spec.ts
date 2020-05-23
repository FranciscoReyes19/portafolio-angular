import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePortafolioComponent } from './home-portafolio.component';

describe('HomePortafolioComponent', () => {
  let component: HomePortafolioComponent;
  let fixture: ComponentFixture<HomePortafolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePortafolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
