import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { forkJoin } from "rxjs";

interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
  image: string;
}

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private baseUrl: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) {}

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }

  getAllPokemon(limit: number = 1008): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.baseUrl}?limit=${limit}`).pipe(
      switchMap((data) => {
        const pokemonObservables = data.results.map((pokemon) =>
          this.getPokemon(pokemon.name).pipe(
            map((pokemonData) => ({
              name: pokemon.name,
              url: pokemon.url,
              image: pokemonData.sprites.front_default,
            }))
          )
        );

        return forkJoin(pokemonObservables).pipe(
          map((pokemonArray) => {
            return {
              count: data.count,
              next: data.next,
              previous: data.previous,
              results: pokemonArray,
            };
          })
        );
      })
    );
  }
}
