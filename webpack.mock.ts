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
    };
    if (user.newLogin) {
      users[user.newLogin] = {
        ...users[user.oldLogin],
        login: user.newLogin,
        phone: user.phone,
        address: user.address,
        description: user.description,
      };
      delete users[user.oldLogin];
    } else {
      users[user.oldLogin] = {
        ...users[user.oldLogin],
        phone: user.phone,
        address: user.address,
        description: user.description,
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
