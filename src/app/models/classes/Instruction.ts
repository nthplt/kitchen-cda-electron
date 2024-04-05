import { UnitMeasure } from '../types/UnitMeasure';

export class Instruction {
  type: string;
  value?: 'D_TXT' | 'D_ING' | 'D_QNT';
  index?: number;
  unit?: UnitMeasure;
  constructor(object: any) {
    this.type = object.type;
    if (object.value) {
      this.value = object.value;
    }
    if (object.index) {
      this.index = object.index;
    }
    if (object.unit) {
      this.unit = object.unit;
    }
  }
}
