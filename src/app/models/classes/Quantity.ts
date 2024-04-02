export class Quantity {
  value: number;
  unit?: 'gram' | 'liter' | 'tablespoon' | 'teaspoon' | 'glass';

  constructor(object: any) {
    this.value = object.value;
    if (object.unit) {
      this.unit = object.unit;
    }
  }
}
