export class Hop {
  id: number;
  name: string;
  alphaAcid: number;
  isPellet: boolean;
  description?: string;
  url?: string;

  copy(hop: Hop) {
    this.id = hop.id;
    this.name = hop.name;
    this.alphaAcid = hop.alphaAcid;
    this.isPellet = hop.isPellet;
    this.description = hop.description;
    this.url = hop.url;

    return this;
  }

}
