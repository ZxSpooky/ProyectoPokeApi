import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonesComponent } from './pokemones/pokemones.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/pokemones', pathMatch: 'full' }, 
  { path: 'pokemones', component: PokemonesComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: 'pokemon/:name', component: PokemonDetailComponent },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
