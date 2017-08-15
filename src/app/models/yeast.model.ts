export class Yeast {
  id: number;
  manufacturer: string;
  name: string;
  attenuation: number;
  description?: string;
  url?: string;

  copy(yeast: Yeast) {
    this.id = yeast.id;
    this.manufacturer = yeast.manufacturer;
    this.name = yeast.name;
    this.attenuation = yeast.attenuation;
    this.description = yeast.description;
    this.url = yeast.url;

    return this;
  }

}
