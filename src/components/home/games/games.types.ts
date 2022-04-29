export enum Platforms {
  PC = "pc",
  Playstation = "playstation",
  Xbox = "xbox",
}

export interface Game {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  date: string;
  link: string;
  platforms: Platforms[];
  age: string;
  genre: string;
}

export enum Layout {
  Grid,
  List,
}
