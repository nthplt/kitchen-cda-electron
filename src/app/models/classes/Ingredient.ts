export class Ingredient {
  id?: string;
  name: string;
  image?: string;
  constructor(object: any) {
    if (object.id) {
      this.id = object.id;
    }
    this.name = object.name;
    if (object.image) {
      this.image = object.image;
    }
  }
}
