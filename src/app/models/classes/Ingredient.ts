export class Ingredient {
  name: string;
  image?: string;
  constructor(object: any) {
    this.name = object.name;
    if (object.image) {
      this.image = object.image;
    }
  }
}
