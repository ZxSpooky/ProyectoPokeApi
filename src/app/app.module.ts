import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonesComponent } from './pokemones/pokemones.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteService } from './services/favorite.service';
import { RouterModule } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
import { HeaderComponent } from './header/header.component';
import { PokemonSummaryComponent } from './pokemon-summary/pokemon-summary.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonesComponent,
    PokemonDetailComponent,
    HeaderComponent,
    PokemonSummaryComponent,
    PokemonSummaryComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule, // Agrega MatDialogModule a los imports
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ],
  providers: [FavoriteService, PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
