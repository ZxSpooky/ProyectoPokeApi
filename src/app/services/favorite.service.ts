import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PokemonResult } from "../services/pokemon.service";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  private favoritePokemons: PokemonResult[] = [];
  private favoritesSubject = new BehaviorSubject<PokemonResult[]>(
    this.favoritePokemons
  );

 
  private selectedPokemonSubject = new BehaviorSubject<PokemonResult | null>(
    null
  );
  selectedPokemon$ = this.selectedPokemonSubject.asObservable();

  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    
    this.selectedPokemonSubject.next(null);
  }

  toggleFavorite(pokemon: PokemonResult): void {
    const index = this.favoritePokemons.findIndex(
      (fav) => fav.name === pokemon.name
    );
    if (index !== -1) {
      this.favoritePokemons.splice(index, 1);
    } else {
      this.favoritePokemons.push(pokemon);
    }
    this.favoritesSubject.next([...this.favoritePokemons]);
  }

 
  openPokemonDetails(pokemon: PokemonResult) {
    this.selectedPokemonSubject.next(pokemon);
  }

 
  closePokemonDetails() {
    this.selectedPokemonSubject.next(null);
  }
}
