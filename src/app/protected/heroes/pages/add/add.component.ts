import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius:5px;
    }
    `
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];
  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: 'assets/no-image.png'
  }

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialag: MatDialog) { }

  ngOnInit(): void {

    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.heroesService.getHeroById(id))
        )
        .subscribe(hero => this.hero = hero);
    }
  }

  save() {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }
    if (this.hero.id) {
      // this.generateID(); // por ahora no voy a actualizar id
      this.heroesService.updateHero(this.hero)
        .subscribe(hero => {          
          this.showSnackBar('Hero updated successfully');
         // this.router.navigate(['/heroes/edit', hero.id]);
        }
        );
    } else {
      this.generateID();
      this.heroesService.addHero(this.hero)
        .subscribe(hero => {          
          this.showSnackBar('Hero created successfully');
          this.router.navigate(['/heroes/edit', hero.id]);
        });
    }
  }
  generateID() {  
    let publisher = 'dc-';
    if (this.hero.publisher === Publisher.MarvelComics) {
      publisher = 'marvel-';
    }    
    const id = publisher + this.hero.superhero.toLowerCase(); //solo funciona en nombre de una palabra
    this.hero.id = id;
  }

  delete() {

    const dialog = this.dialag.open(ConfirmComponent, {
      width: '250px',
      data: this.hero
    });

    dialog.afterClosed()
      .subscribe(
        (result) => {
          if (result) {
            this.heroesService.deleteHero(this.hero.id!)
              .subscribe(resp => {
                this.showSnackBar('Hero deleted successfully');
                this.router.navigate(['/heroes']);
              });
          }
        });

  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'ok!', {
      duration: 2500,
      data: this.hero
    });
  }

}
