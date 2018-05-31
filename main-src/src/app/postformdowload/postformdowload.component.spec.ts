import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostformdowloadComponent } from './postformdowload.component';

describe('PostformdowloadComponent', () => {
  let component: PostformdowloadComponent;
  let fixture: ComponentFixture<PostformdowloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostformdowloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostformdowloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
