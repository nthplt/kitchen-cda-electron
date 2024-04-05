import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CouteauSuisseService } from '../../../services/couteauSuisse/couteau-suisse.service';
import { ValidatorsService } from '../../../services/validators/validators.service';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../../models/classes/Ingredient';
import { Step } from '../../../models/classes/Step';
import { Recipe } from '../../../models/classes/Recipe';
import { DataService } from '../../../services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class RecipeComponent {
  constructor(
    private fb: FormBuilder,
    private csService: CouteauSuisseService,
    private router: Router,
    private dataService: DataService,
    private validatorsService: ValidatorsService
  ) {
    this.dataService.getAllEntity('ingredients').then((listIng: any) => {
      this.listIngredientData = listIng;
    });
  }

  protected listIngredientData?: Ingredient[];
  protected recipeImage?: string;
  protected stepsRecipe: Step[] = [];
  protected ingredientsRecipe: Ingredient[] = [];
  protected fileSelectError: boolean = false;

  protected recipeForm: UntypedFormGroup = this.fb.group({
    name: this.fb.control<string>('', [
      this.validatorsService.controlLengthTrim(1),
    ]),
    description: this.fb.control<string>('', [
      this.validatorsService.controlLengthTrim(1),
    ]),
    category: this.fb.control<'salty' | 'sweet' | null>(null),
  });

  /* #region Getters & Setters */
  get nameControl(): AbstractControl {
    return this.recipeForm.controls['name'];
  }

  get descriptionControl(): AbstractControl {
    return this.recipeForm.controls['description'];
  }

  get categoryControl(): AbstractControl {
    return this.recipeForm.controls['category'];
  }

  get ingredientsControl(): AbstractControl {
    return this.recipeForm.controls['ingredients'];
  }
  /* #endregion */

  /* #region Steps */
  editIngredient(ingIndex: string, ingToEdit: Ingredient) {
    this.ingredientsRecipe = this.ingredientsRecipe.map((i: Ingredient) =>
      i.id === '' || i.id === ingToEdit.id
        ? (this.listIngredientData?.find(
            (ing) => ing.id == ingIndex
          ) as Ingredient)
        : i
    );
  }

  addIng() {
    this.ingredientsRecipe.push({
      id: '',
      name: '',
    });
  }

  removeIng(index: number) {
    this.ingredientsRecipe.splice(index, 1);
  }

  addStep(): void {
    this.stepsRecipe.push({
      instructions: [],
      image: null as any,
      tools: [],
    });
  }

  removeStep(index: number): void {
    this.stepsRecipe.splice(index, 1);
  }

  addInstruction(stepIndex: number): void {
    this.stepsRecipe[stepIndex].instructions.push({
      type: 'D_TXT',
      value: undefined,
      index: undefined,
      unit: undefined,
    });
  }

  removeInstruction(stepIndex: number, instructionIndex: number): void {
    delete this.stepsRecipe[stepIndex].instructions[instructionIndex];
  }
  /* #endregion */

  protected onSubmit() {
    if (this.recipeForm.valid) {
      const recipeToSend: Recipe = {
        ...this.recipeForm.value,
        image: this.recipeImage,
        ingredients: this.ingredientsRecipe,
        steps: this.stepsRecipe,
      };

      this.dataService
        .addEntity('recipes', recipeToSend)
        .finally(() => this.router.navigateByUrl('/'));
    }
  }

  async selectFile(
    event: any,
    ingIndex?: number,
    stepIndex?: number
  ): Promise<void> {
    // Méthode appelé lors de la selection de fichiers apres click sur l'input File
    const filesTargets = event.target?.files as FileList;
    const file: File | null = filesTargets.item(0);

    if (file && file.type.includes('image/')) {
      const imageData: string = await this.csService.convertFileToBase64(file);
      if (ingIndex !== undefined) {
        this.ingredientsRecipe[ingIndex].image = imageData;
      } else if (stepIndex !== undefined) {
        this.stepsRecipe[stepIndex].image = imageData;
      } else {
        this.recipeImage = imageData;
      }
    } else if (file) {
      this.fileSelectError = true;
    }
  }
}
