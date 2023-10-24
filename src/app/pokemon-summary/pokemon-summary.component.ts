import { Component, Input } from "@angular/core";
import { PokemonResult } from "../services/pokemon.service";

@Component({
  selector: "app-pokemon-summary",
  templateUrl: "./pokemon-summary.component.html",
  styleUrls: ["./pokemon-summary.component.css"],
})
export class PokemonSummaryComponent {
  @Input() allPokemons: PokemonResult[] = [];

  alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
  pokemonCountByLetter: { [letter: string]: number } = {};
  showPokemonSummary = false;

  ngOnChanges(): void {
    this.countPokemonByLetter();
  }

  countPokemonByLetter() {
    this.pokemonCountByLetter = {};

    for (const pokemon of this.allPokemons) {
      const firstLetter = pokemon.name.charAt(0).toLowerCase();
      this.pokemonCountByLetter[firstLetter] =
        (this.pokemonCountByLetter[firstLetter] || 0) + 1;
    }
  }

  togglePokemonSummary() {
    this.showPokemonSummary = !this.showPokemonSummary;
  }
}
