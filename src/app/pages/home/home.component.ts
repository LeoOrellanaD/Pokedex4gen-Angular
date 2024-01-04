import {
  Component,
  OnInit,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

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

  @ViewChild('pokemonList') pokemonList: Element | undefined;

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
      console.log('selected');
      selectedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        // console.log(`Pressed ${event.key}!`);
        this.selectPreviousPokemon();
        this.scrollSelectedItemIntoView();

        break;
      case 'ArrowDown':
        //console.log(`Pressed ${event.key}!`);
        this.selectNextPokemon();
        this.scrollSelectedItemIntoView();
        break;
      case 'Enter':
        //console.log(`Pressed ${event.key}!`);
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

  BackgroundSound() {
    document.addEventListener(
      'click',
      () => {
        const audio = new Audio();
        audio.src = '../assets/0004.mp3';
        audio.load();
        audio.loop = true;
        audio.volume = 0.1; //MODIFCAR EL VOLUMEN DESPUES
        audio.play();
      },
      { once: true }
    );
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
      requests.push(this.pokemonService.getPokemonById(i));
    }
    forkJoin(requests).subscribe((data) => {
      this.pokemon = data.sort((a, b) => a.id - b.id);
      //console.log('Bulbasaur:', this.pokemon[0]);
      //console.log('Bulbasaur:', this.pokemon[320]); // QUITAR ESTE CONSOLE.LOG DESPUES
    });
  }
  handleSelectedPokemonScroll(): void {
    if (history.state && history.state.pokemon && history.state.pokemon.id) {
      const selectedPokemonId = history.state.pokemon.id;

      this.selected = selectedPokemonId;
      this.scrollSelectedItemIntoView();
    } else {
      this.selected = 1;
    }
  }

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.handleSelectedPokemonScroll();
    this.fetchPokemonData();
    this.BackgroundSound();
  }
}
