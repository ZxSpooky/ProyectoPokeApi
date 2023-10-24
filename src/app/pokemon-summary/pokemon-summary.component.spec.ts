import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSummaryComponent } from './pokemon-summary.component';

describe('PokemonSummaryComponent', () => {
  let component: PokemonSummaryComponent;
  let fixture: ComponentFixture<PokemonSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonSummaryComponent]
    });
    fixture = TestBed.createComponent(PokemonSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
