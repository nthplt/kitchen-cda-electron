import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { first } from 'rxjs';
import { Recipe } from '../../../models/classes/Recipe';
import { DataService } from '../../../services/data/data.service';
import { Ingredient } from '../../../models/classes/Ingredient';
import { CommonModule } from '@angular/common';
import { DisplayInstructionsPipe } from '../../../pipes/display-instructions/display-instructions.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-id',
  standalone: true,
  templateUrl: './recipe-id.component.html',
  styleUrl: './recipe-id.component.scss',
  imports: [CommonModule, DisplayInstructionsPipe, FormsModule],
})
export class RecipeIdComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  recipe!: Recipe;
  personMultiplicator: number = 1;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(first())
      .subscribe((paramMap: ParamMap) => {
        this.dataService
          .getEntityById('recipes', paramMap.get('id')!)
          .then((recipe) => {
            this.recipe = recipe as Recipe;
          });
      });
  }
}
