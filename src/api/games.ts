import { MockServerHelper } from "webpack-mock-server/lib/mockServerHelper";

export default function getGamesResponse(helper: MockServerHelper) {
  return [
    {
      id: helper.getUniqueIdInt(),
      name: "Minecraft",
      image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
      description:
        "In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple machines. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world.",
      price: 29.99,
      date: "2020-07-05",
      link: "https://www.minecraft.net/ru-ru",
      platforms: ["pc", "playstation", "xbox"],
      age: "3",
      genre: "Arcade",
    },
    {
      id: helper.getUniqueIdInt(),
      name: "Overwatch",
      image: "https://upload.wikimedia.org/wikipedia/ru/3/33/Overwatch_Origins_Edition_PC_cover.jpg",
      description:
        "In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple machines. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world.",
      price: 24,
      date: "2021-07-05",
      link: "https://playoverwatch.com/ru-ru/",
      platforms: ["playstation", "xbox"],
      age: "12",
      genre: "Shooter",
    },
    {
      id: helper.getUniqueIdInt(),
      name: "Fortnite",
      image:
        "https://cdn.vox-cdn.com/thumbor/XQ_xJCpkJxzPNUH7RHWKzoIQ5xk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22372475/13br_evergreens_blue_newsheader_1920x1080_864041204.jpeg",
      description:
        "In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple machines. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world.",
      price: 19.5,
      date: "2019-07-05",
      link: "https://www.epicgames.com/fortnite/ru/home",
      platforms: ["pc", "playstation"],
      age: "18",
      genre: "Survive",
    },
    {
      id: helper.getUniqueIdInt(),
      name: "Dota",
      image:
        "https://upload.wikimedia.org/wikipedia/ru/thumb/8/8e/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Dota_2.jpg/266px-%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_Dota_2.jpg",
      description:
        "In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple machines. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world.",
      price: 30,
      date: "2016-07-05",
      link: "https://www.epicgames.com/fortnite/ru/home",
      platforms: ["pc"],
      age: "12",
      genre: "Survive",
    },
    {
      id: helper.getUniqueIdInt(),
      name: "World of Warcraft",
      image: "https://dic.academic.ru/pictures/wiki/files/119/world_of_warcraft_cover.jpg",
      description:
        "In Minecraft, players explore a blocky, procedurally generated 3D world with virtually infinite terrain, and may discover and extract raw materials, craft tools and items, and build structures, earthworks and simple machines. Depending on game mode, players can fight computer-controlled mobs, as well as cooperate with or compete against other players in the same world.",
      price: 16,
      date: "2018-07-05",
      link: "https://www.epicgames.com/fortnite/ru/home",
      platforms: ["pc", "playstation", "xbox"],
      age: "6",
      genre: "Arcade",
    },
  ];
}
