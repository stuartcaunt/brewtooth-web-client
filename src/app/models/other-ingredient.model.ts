export class OtherIngredient {
  id: number;
  name: string;
  description?: string;
  url?: string;

  copy(otherIngredient: OtherIngredient) {
    this.id = otherIngredient.id;
    this.name = otherIngredient.name;
    this.description = otherIngredient.description;
    this.url = otherIngredient.url;

    return this;
  }

}
