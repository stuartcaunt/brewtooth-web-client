export class Hop {
  id: number;
  name: string;
  alphaAcid: number;
  isPellet: boolean;
  description?: string;
  url?: string;

  copy(malt: Hop) {
    this.id = malt.id;
    this.name = malt.name;
    this.alphaAcid = malt.alphaAcid;
    this.isPellet = malt.isPellet;
    this.description = malt.description;
    this.url = malt.url;

    return this;
  }

}
