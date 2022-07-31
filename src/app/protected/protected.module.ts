import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesModule } from './heroes/heroes.module';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HeroesModule,
    MaterialModule
  ]
})
export class ProtectedModule { }
