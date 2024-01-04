import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-list',
  standalone: true,
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent {
  @Input() pokemon?: any;
  @Input() selectedId?: number;

  isSelected(): boolean {
    return this.pokemon.id === this.selectedId;
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
