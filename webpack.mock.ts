// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from "@/api/users";
import webpackMockServer from "webpack-mock-server";
import { getGamesResponse } from "./src/api/games";

const testUser: User = {
  login: "qweqwe",
  password: "Qwe123",
  phone: "5678999",
  description: "ejdjdkdkdkdk",
  address: "Minsk",
  photo: "",
};

const users = {
  [testUser.login]: testUser,
};

export default webpackMockServer.add((app, helper) => {
  app.get("/testMock", (_req, res) => {
    const response = {
      id: helper.getUniqueIdInt(),
      randomInt: helper.getRandomInt(),
      lastDate: new Date(),
    };

    res.json(response);
  });

  app.get("/api/getTopProducts", (_req, res) => {
    res.json(getGamesResponse(helper));
  });

  app.get("/api/search/:text", ({ params: { text } }, res) => {
    res.json(getGamesResponse(helper).filter((game) => game.name.toLowerCase().includes(text.toLowerCase())));
  });

  app.get("/api/products", ({ query: { platform, genre, age, sortCriteria, sortType, search } }, res) => {
    let products = [...getGamesResponse(helper)];
    if (platform) products = products.filter((game) => game.platforms.includes(platform.toString()));
    if (genre) products = genre !== "All genres" ? products.filter((game) => game.genre === genre) : products;
    if (age) products = age !== "All ages" ? products.filter((game) => game.age === Number(age)) : products;
    if (search) products = products.filter((game) => game.name.toLowerCase().includes(search.toString().toLowerCase()));

    products.sort((a, b) => {
      switch (sortCriteria) {
        case "recent":
          if (a.date < b.date) return sortType === "asc" ? 1 : -1;
          if (a.date > b.date) return sortType === "asc" ? -1 : 1;
          if (a.date === b.date) return 0;
          break;

        case "name":
          if (a.name < b.name) return sortType === "asc" ? -1 : 1;
          if (a.name > b.name) return sortType === "asc" ? 1 : -1;
          if (a.name === b.name) return 0;
          break;

        case "price":
          if (a.price < b.price) return sortType === "asc" ? -1 : 1;
          if (a.price > b.price) return sortType === "asc" ? 1 : -1;
          if (a.price === b.price) return 0;
          break;

        default:
          break;
      }
      return 0;
    });
    setTimeout(() => {
      res.json(products);
    }, 1000);
  });

  app.post("/api/auth/signUp", (req, res) => {
    const user: User = {
      login: req.body.login,
      password: req.body.password,
    };
    users[user.login] = user;
    res.status(201).json({ isAuth: true, username: user.login });
  });

  app.put("/api/auth/signIn", (req, res) => {
    const user: User = {
      login: req.body.login,
      password: req.body.password,
    };
    if (users[user.login]) {
      if (users[user.login].login === user.login && users[user.login].password === user.password) {
        res.status(200).json({
          isAuth: true,
          username: users[user.login].login,
          address: users[user.login].address,
          description: users[user.login].description,
          phone: users[user.login].phone,
        });
      }
    } else {
      res.status(400).json({ isAuth: false });
    }
  });

  app.post("/api/changePassword", (req, res) => {
    const user = {
      login: req.body.login,
      newPassword: req.body.password,
    };
    users[user.login].password = user.newPassword;
    res.status(200).end();
  });

  app.post("/api/saveProfile", (req, res) => {
    const user = {
      oldLogin: req.body.login,
      newLogin: req.body.newLogin,
      phone: req.body.phone,
      address: req.body.address,
      description: req.body.description,
      photo: req.body.photo,
    };
    if (user.newLogin) {
      users[user.newLogin] = {
        ...users[user.oldLogin],
        login: user.newLogin,
        phone: user.phone,
        address: user.address,
        description: user.description,
        photo: user.photo,
      };
      delete users[user.oldLogin];
    } else {
      users[user.oldLogin] = {
        ...users[user.oldLogin],
        login: user.oldLogin,
        phone: user.phone,
        address: user.address,
        description: user.description,
        photo: user.photo,
      };
    }
    res.status(200).end();
  });

  app.get("/api/getProfile/:login", (req, res) => {
    res.json(users[req.params.login]);
  });

  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
