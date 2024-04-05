import { Instruction } from './Instruction';

export class Step {
  instructions: Instruction[];
  image: string;
  tools: any[];
  constructor(object: any) {
    this.instructions = object.instructions;
    this.image = object.image;
    this.tools = object.tools;
  }
}
