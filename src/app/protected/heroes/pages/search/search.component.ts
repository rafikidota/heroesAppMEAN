import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  query: string = '';
  heroes: Hero[] = [];
  selectedHero: Hero | undefined;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  searching() {
    this.heroesService.getSuggestions(this.query.trim())
      .subscribe(heroes => {
        this.heroes = heroes
        console.log(this.heroes);
        
      });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      console.log('No hay valor');
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.query = hero.superhero;
    this.heroesService.getHeroById(hero.id!)
      .subscribe(hero => this.selectedHero = hero);
  }
  heroNotFound() {
    return (this.heroes.length === 0 && this.query.trim().length > 0);
  }
}
