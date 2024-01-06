import { Component, OnInit, HostListener } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { ItemListComponent } from '../../components/item-list/item-list.component';

import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardComponent, ItemListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pokemon: any[] = [];
  selected = 1;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.handleSelectedPokemon();
    this.fetchPokemonData();
  }

  selectNextPokemon() {
    if (this.selected < this.pokemon.length) {
      this.selected++;
      this.SelectSound();
    }
  }

  selectPreviousPokemon() {
    if (this.selected > 1) {
      this.selected--;
      this.SelectSound();
    }
  }

  scrollSelectedItemIntoView() {
    const selectedItem = document.getElementById(this.selected.toString());
    if (selectedItem) {
      console.log(selectedItem);
      selectedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.selectPreviousPokemon();
        this.scrollSelectedItemIntoView();

        break;
      case 'ArrowDown':
        this.selectNextPokemon();
        this.scrollSelectedItemIntoView();
        break;
      case 'Enter':
        this.goInfo();
        break;
      default:
        event.preventDefault();
        break;
    }
  }

  SelectSound() {
    const audio = new Audio();
    audio.src = '../assets/00BD.mp3';
    audio.load();
    audio.play();
  }

  goInfo() {
    const selectedPokemon = this.pokemon[this.selected - 1];
    this.router.navigate(['/info'], {
      state: { pokemon: selectedPokemon, pokemonList: this.pokemon },
    });
  }

  fetchPokemonData(): void {
    const numberOfPokemon = 493;
    const requests = [];

    for (let i = 1; i <= numberOfPokemon; i++) {
      requests.push(
        of(i).pipe(concatMap((id) => this.pokemonService.getPokemonById(id)))
      );
    }

    forkJoin(requests)
      .pipe(map((data) => data.sort((a, b) => a.id - b.id)))
      .subscribe((data) => {
        this.pokemon = data;
      });
  }

  handleSelectedPokemon() {
    if (history.state.currentPokemon !== undefined) {
      this.selected = history.state.currentPokemon;
      this.scrollSelectedItemIntoViewDelayed();
    }
  }

  scrollSelectedItemIntoViewDelayed() {
    setTimeout(() => {
      const selectedItem = document.getElementById(this.selected.toString());
      console.log(selectedItem);
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'center' });
      }
    }, 1500);
  }
}
