import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscursosComponent } from './subscursos.component';

describe('SubscursosComponent', () => {
  let component: SubscursosComponent;
  let fixture: ComponentFixture<SubscursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscursosComponent]
    });
    fixture = TestBed.createComponent(SubscursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
