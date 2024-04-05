import { EventEmitter, Injectable, Output } from '@angular/core';
import { UnitMeasure } from '../../models/types/UnitMeasure';

@Injectable({
  providedIn: 'root',
})
export class CouteauSuisseService {
  constructor() {}
  @Output() searchRecipeEvent = new EventEmitter<string>();

  emitSearchRecipeValue(str: string) {
    this.searchRecipeEvent.emit(str);
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  getUnitStringByMeasure(unit: UnitMeasure) {
    switch (unit) {
      case 'glass':
        return 'verre(s)';
      case 'gram':
        return 'gramme(s)';
      case 'liter':
        return 'litre(s)';
      case 'tablespoon':
        return 't(s)';
      case 'teaspoon':
        return 'rr(s)';
    }
  }
}
