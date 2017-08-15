export class Sugar {
  id: number;
  name: string;
  description?: string;
  url?: string;

  copy(malt: Sugar) {
    this.id = malt.id;
    this.name = malt.name;
    this.description = malt.description;
    this.url = malt.url;

    return this;
  }

}
