export class Malt {
  id: number;
  name: string;
  grain: string;
  yield: number;
  ebc: number;
  description: string;
  url: string;

  copy(malt: Malt) {
    this.id = malt.id;
    this.name = malt.name;
    this.grain = malt.grain;
    this.yield = malt.yield;
    this.ebc = malt.ebc;
    this.description = malt.description;
    this.url = malt.url;

    return this;
  }

}
