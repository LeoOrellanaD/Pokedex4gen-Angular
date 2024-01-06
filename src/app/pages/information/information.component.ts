import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SecondHeaderComponent } from '../../components/second-header/second-header.component';
import { SecondFooterComponent } from '../../components/second-footer/second-footer.component';
import { CardComponent } from '../../components/card/card.component';
import { DetailComponent } from '../../components/detail/detail.component';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    SecondHeaderComponent,
    SecondFooterComponent,
    CardComponent,
    DetailComponent,
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css',
})
export class InformationComponent implements OnInit {
  selectedPokemon: any;
  pokemonId?: string;
  pokemonList: any[] = [];
  currentPokemonIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  showNextPokemon() {
    if (this.selectedPokemon.id < this.pokemonList.length) {
      this.currentPokemonIndex = this.selectedPokemon.id;
      this.selectedPokemon = this.pokemonList[this.currentPokemonIndex];
      this.SelectSound();
    }
  }

  showPreviousPokemon() {
    if (this.currentPokemonIndex > 0) {
      this.currentPokemonIndex--;
      this.selectedPokemon = this.pokemonList[this.currentPokemonIndex];
      this.SelectSound();
    }
  }

  goHome() {
    this.router.navigate(['/'], { state: { currentPokemon: this.selectedPokemon.id } });
  }

  SelectSound() {
    const audio = new Audio();
    audio.src = '../assets/00BD.mp3';
    audio.load();
    audio.play();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.showPreviousPokemon();
        break;
      case 'ArrowDown':
        this.showNextPokemon();
        break;
      case 'Enter':
        this.goHome();
        break;
      default:
        event.preventDefault();
        break;
    }
  }

  ngOnInit(): void {
    this.selectedPokemon = history.state.pokemon;
    this.pokemonList = history.state.pokemonList;
  }
}
