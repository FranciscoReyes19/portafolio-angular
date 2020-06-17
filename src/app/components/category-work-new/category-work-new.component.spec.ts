import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWorkNewComponent } from './category-work-new.component';

describe('CategoryWorkNewComponent', () => {
  let component: CategoryWorkNewComponent;
  let fixture: ComponentFixture<CategoryWorkNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWorkNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWorkNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
