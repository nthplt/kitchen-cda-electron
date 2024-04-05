import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../../services/data/data.service';
import { Recipe } from '../../../models/classes/Recipe';
import { CommonModule } from '@angular/common';
import { CouteauSuisseService } from '../../../services/couteauSuisse/couteau-suisse.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    protected router: Router,
    private dataService: DataService,
    private csService: CouteauSuisseService
  ) {}

  protected vueClass: string = 'list-viti-card';

  protected listRecipes: Recipe[] = [];
  protected originListRecipes: Recipe[] = [];

  ngOnInit(): void {
    this.dataService.getAllEntity('recipes').then((listRecipe: any) => {
      this.listRecipes = listRecipe;
      this.originListRecipes = listRecipe;
    });
    this.csService.searchRecipeEvent.subscribe((str: string) => {
      console.log(str);

      this.listRecipes = this.originListRecipes.filter((recipe: Recipe) =>
        recipe.name.includes(str)
      );
    });
  }
}
