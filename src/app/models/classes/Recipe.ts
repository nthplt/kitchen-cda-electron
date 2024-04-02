import { UnitMeasure } from '../types/UnitMeasure';
import { Image } from './Image';
import { Ingredient } from './Ingredient';
import { Quantity } from './Quantity';

export class Recipe {
  name: string;
  description: string;
  image?: Image;
  categorie: 'salty' | 'sweet';
  ingredients: {
    ingredient: Ingredient;
    quantity?: Quantity;
  }[];
  steps: Array<{
    instructions: Array<{
      type: 'D_TXT' | 'D_ING' | 'D_QNT';
      value?: string | number;
      index?: number;
      unit?: UnitMeasure;
    }>;
    image?: Image;
    tools: number[];
  }>;

  constructor(object: any) {
    this.name = object.name;
    this.description = object.description;
    if (object.image) {
      this.image = object.image;
    }
    this.categorie = object.categorie;
    this.ingredients = object.ingredients;
    this.steps = object.steps;
  }
}
