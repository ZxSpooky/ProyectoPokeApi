import { Component, OnInit, Input } from "@angular/core";
// Elimina esta línea si no se utiliza PokemonService en el componente
import { PokemonService } from "../services/pokemon.service";
import { ActivatedRoute } from "@angular/router";
import { PokemonResult } from "../services/pokemon.service";
import { FavoriteService } from "../services/favorite.service";

@Component({
  selector: "app-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.css"],
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemonName: string = "";
  @Input() pokemonDetails: any;
  @Input() favoritePokemons: PokemonResult[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.loadPokemonDetails("bulbasaur");
  }

  toggleFavorite() {
    if (
      this.pokemonDetails &&
      this.pokemonDetails.name &&
      this.pokemonDetails.sprites
    ) {
      const pokemonInfo: PokemonResult = {
        name: this.pokemonDetails.name,
        image: this.pokemonDetails.sprites.front_default,
        url: "",
      };
      this.favoriteService.toggleFavorite(pokemonInfo);
    }
  }

  ngOnChanges(): void {
    if (this.pokemonName) {
      this.loadPokemonDetails(this.pokemonName);
    }
  }

  isPokemonFavorite(): boolean {
    return this.favoritePokemons.some(
      (fav) => fav.name === this.pokemonDetails.name
    );
  }

  loadPokemonDetails(pokemonName: string) {
    if (pokemonName) {
      this.pokemonService.getPokemon(pokemonName).subscribe((data) => {
        this.pokemonDetails = data;
      });
    } else {
    }
  }
}
