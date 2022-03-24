import { MockServerHelper } from "webpack-mock-server/lib/mockServerHelper";
import api from ".";

export interface Game {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  date: string;
}

export async function getGames(): Promise<Game[]> {
  const response = await api.get<Game[]>("/api/getTopProducts");
  return response.data.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export function getGamesResponse(helper: MockServerHelper) {
  return [
    {
      id: helper.getUniqueIdInt(),
      name: "Minecraft",
      image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
      description:
        "In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple machines. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world.",
      price: 29,
      date: "2020-07-05",
    },
    {
      id: helper.getUniqueIdInt(),
      name: "Overwatch",
      image: "https://upload.wikimedia.org/wikipedia/ru/3/33/Overwatch_Origins_Edition_PC_cover.jpg",
      description:
        "In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple machines. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world.",
      price: 24,
      date: "2021-07-05",
    },
    {
      id: helper.getUniqueIdInt(),
      name: "Fortnite",
      image:
        "https://cdn.vox-cdn.com/thumbor/XQ_xJCpkJxzPNUH7RHWKzoIQ5xk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22372475/13br_evergreens_blue_newsheader_1920x1080_864041204.jpeg",
      description:
        "In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple machines. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world.",
      price: 19,
      date: "2019-07-05",
    },
  ];
}
