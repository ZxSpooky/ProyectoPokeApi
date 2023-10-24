import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { PokemonResult } from "../services/pokemon.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { PokemonDetailComponent } from "../pokemon-detail/pokemon-detail.component";
import { FavoriteService } from "../services/favorite.service";
@Component({
  selector: "app-pokemones",
  templateUrl: "./pokemones.component.html",
  styleUrls: ["./pokemones.component.css"],
})
export class PokemonesComponent implements OnInit, AfterViewInit {
  name: string = "";
  pokemons: PokemonResult[] = [];
  displayedColumns: string[] = ["name", "image"];
  dataSource = new MatTableDataSource<PokemonResult>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(PokemonDetailComponent, { static: false }) pokemonDetailComponent:
    | PokemonDetailComponent
    | undefined;

  pokemonName: string = "";
  pokemonImage: string =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
  pokemonDetails: any;
  favoritePokemons: PokemonResult[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private pokemonService: PokemonService,
    private router: Router
  ) {
    this.favoriteService.favorites$.subscribe((favorites) => {
      this.favoritePokemons = favorites;
    });
  }
  ngOnInit(): void {
    this.loadPokemonList();
  }

  toggleFavorite(pokemon: PokemonResult) {
    this.favoriteService.toggleFavorite(pokemon);
  }

  isFavorite(pokemon: PokemonResult): boolean {
    return this.favoritePokemons.includes(pokemon);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.paginator.pageSize = 6;
      this.dataSource.paginator = this.paginator;
    });
  }
  selectedPokemon: any;

  search() {
    if (this.name) {
      this.pokemonService.getPokemon(this.name).subscribe((data) => {
        if (data) {
          const pokemonIndex = this.pokemons.findIndex(
            (pokemon) => pokemon.name === data.name
          );
          if (pokemonIndex !== -1) {
            const pageIndex = Math.floor(
              pokemonIndex / this.paginator.pageSize
            );

            this.paginator.pageIndex = pageIndex;
            this.paginator._changePageSize(this.paginator.pageSize);
          }

          this.selectedPokemon = data;
          if (this.pokemonDetailComponent) {
            this.pokemonDetailComponent.loadPokemonDetails(
              this.selectedPokemon.name
            );
          } else {
            console.log("El componente  no está disponible.");
          }
        } else {
          console.log("El Pokémon no se encontró.");
        }
      });
    } else {
    }
  }

  selectPokemon(pokemon: PokemonResult) {
    this.router.navigate(["/pokemon", pokemon.name]);

    this.selectedPokemon = pokemon;
    if (this.pokemonDetailComponent) {
      this.pokemonDetailComponent.loadPokemonDetails(pokemon.name);
    } else {
      console.log("El componente PokemonDetailComponent no está disponible.");
    }
  }

  loadPokemonList() {
    this.pokemonService.getAllPokemon().subscribe((data) => {
      this.pokemons = data.results.map((pokemon, index) => {
        return { number: index + 1, ...pokemon };
      });
      this.dataSource.data = this.pokemons;
    });
  }
}
