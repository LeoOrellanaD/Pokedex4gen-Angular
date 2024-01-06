import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  @Input() pokemon?: any;

  typeColors: { [key: string]: string } = {
    fire: '#f08030',
    water: '#6890f0',
    grass: '#77c74f',
    poison: '#a040a0',
    normal: '#a8a878',
    fighting: '#c03028',
    flying: '#a78ef0',
    ground: '#e0c068',
    rock: '#b8a038',
    bug: '#a8b820',
    ghost: '#705898',
    steel: '#b8b8d0',
    electric: '#f8cf29',
    psychic: '#f85082',
    ice: '#98d8d8',
    dark: '#705848',
    fairy: '#ff5dd3',
    dragon: '#7038f8',
  };

  getTypeColor(type: string): string {
    return this.typeColors[type] || 'black';
  }

  formattedId(): string {
    const id = this.pokemon.id;
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    } else {
      return `${id}`;
    }
  }
}
