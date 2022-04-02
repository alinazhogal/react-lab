// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from "@/api/users";
import webpackMockServer from "webpack-mock-server";
import { getGamesResponse } from "./src/api/games";

const testUser: User = { login: "qweqweqwe", password: "qwe123A@" };
const users = new Set<User>([testUser]);

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

  function checkIsUserExist(user: User): boolean {
    let exists = false;

    users.forEach((us) => {
      console.log({ us, user });
      if (us.login === user.login && us.password === user.password) {
        exists = true;
      }
    });

    return exists;
  }

  app.post("/api/auth/signUp", (req, res) => {
    const user: User = {
      login: req.body.login,
      password: req.body.password,
    };
    users.add(user);
    res.status(201).json({ isAuth: true });
  });

  app.put("/api/auth/signIn", (req, res) => {
    console.log("REQUEST HEE!");
    const user: User = {
      login: req.body.login,
      password: req.body.password,
    };

    const exists = checkIsUserExist(user);

    if (exists) {
      res.status(200).json({ isAuth: true });
    } else {
      res.status(400).json({ isAuth: false });
    }
  });

  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
