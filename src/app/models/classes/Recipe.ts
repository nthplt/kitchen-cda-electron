import { UnitMeasure } from '../types/UnitMeasure';
import { Ingredient } from './Ingredient';
import { Instruction } from './Instruction';
import { Quantity } from './Quantity';

export class Recipe {
  id?: string;
  name: string;
  description: string;
  image?: string;
  category: 'salty' | 'sweet';
  ingredients: Ingredient[];
  steps: Array<{
    instructions: Array<Instruction>;
    image?: string;
  }>;

  constructor(object: any) {
    if (object.id) {
      this.id = object.id;
    }
    this.name = object.name;
    this.description = object.description;
    if (object.image) {
      this.image = object.image;
    }
    this.category = object.category;
    this.ingredients = object.ingredients;
    this.steps = object.steps;
  }
}
