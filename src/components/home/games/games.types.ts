export const enum Platforms {
  PC = "pc",
  Playstation = "playstation",
  Xbox = "xbox",
}

export const enum Genres {
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

export const enum Layout {
  Grid,
  List,
}
