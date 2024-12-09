import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CensusComponent } from './census.component';

describe('CensusComponent', () => {
  let component: CensusComponent;
  let fixture: ComponentFixture<CensusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CensusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
