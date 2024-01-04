import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private numberOfPokemon = 493;

  constructor(private http: HttpClient) {}

  getPokemonById(pokemonId: number): Observable<any> {
    const url = `${this.baseUrl}/pokemon/${pokemonId}`;
    return this.http.get<any>(url);
  }
}
