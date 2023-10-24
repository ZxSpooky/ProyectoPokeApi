import { Component, OnInit } from "@angular/core";
import { FavoriteService } from "../services/favorite.service";
import { PokemonResult } from "../services/pokemon.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { PokemonService } from "../services/pokemon.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  favoritePokemons: PokemonResult[] = [];
  hoveredPokemon: PokemonResult | null = null;
  showDialog: boolean = false;

  constructor(
    private favoriteService: FavoriteService,
    private dialog: MatDialog,
    private pokemonService: PokemonService
  ) {
    this.favoriteService.favorites$.subscribe((favorites) => {
      this.favoritePokemons = favorites;
    });
  }
  onPokemonHover(pokemon: PokemonResult | null): void {
    this.hoveredPokemon = pokemon;
  }

  ngOnInit(): void {}

  openPokemonDetails(pokemon: PokemonResult) {
    this.pokemonService.getPokemon(pokemon.name).subscribe((pokemonDetails) => {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { pokemon: pokemonDetails },
      });
    });
  }
  closeDialog() {
    this.favoriteService.closePokemonDetails();
    this.showDialog = false;
  }
}
