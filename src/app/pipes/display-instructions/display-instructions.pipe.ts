import { Pipe, PipeTransform } from '@angular/core';
import { Instruction } from '../../models/classes/Instruction';
import { Ingredient } from '../../models/classes/Ingredient';
import { Recipe } from '../../models/classes/Recipe';
import { CouteauSuisseService } from '../../services/couteauSuisse/couteau-suisse.service';

@Pipe({
  name: 'displayInstructions',
  standalone: true,
})
export class DisplayInstructionsPipe implements PipeTransform {
  constructor(private csService: CouteauSuisseService) {}

  transform(
    value: Instruction[],
    recipe: Recipe,
    multiplicator: number
  ): string {
    return value
      .map((i: Instruction) => {
        if (i.type === 'D_TXT') {
          return i.value;
        } else if (i.type === 'D_ING') {
          return recipe.ingredients[Number(i.index)!].name + '(s)';
        } else {
          return `${Number(i.value) * multiplicator} ${
            i.unit ? this.csService.getUnitStringByMeasure(i.unit!) : ''
          }`;
        }
      })
      .join(' ');
  }
}
