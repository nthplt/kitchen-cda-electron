import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../../services/data/data.service';
import { Recipe } from '../../../models/classes/Recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(protected router: Router, private dataService: DataService) {}

  protected vueClass: string = 'list-viti-card';

  protected listRecipes: Recipe[] = [];

  ngOnInit(): void {
    this.dataService.getAllEntity('recipes').then((listRecipe: any) => {
      this.listRecipes = listRecipe;
    });
  }
}
