export enum Platforms {
  PC = "pc",
  Playstation = "playstation",
  Xbox = "xbox",
}

export enum Genres {
  Arcade = "Arcade",
  Shooter = "Shooter",
  Survive = "Survive",
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
  genre: Genres;
}

export enum Layout {
  Grid,
  List,
}
