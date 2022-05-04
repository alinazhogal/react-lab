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
  cart: [],
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

    res.json(products);
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
          cart: users[user.login].cart,
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

  app.get("/api/getCart/:login", (req, res) => {
    res.json(users[req.params.login].cart);
  });

  app.post("/api/addCartItem", (req, res) => {
    const { login } = req.body;
    const cartItem = {
      name: req.body.name,
      image: req.body.image,
      platforms: req.body.platforms,
      selectedPlatform: req.body.platforms[0],
      date: new Date().toLocaleDateString(),
      amount: 1,
      price: req.body.price,
      id: req.body.id,
    };
    if (users[login].cart?.some((item) => item.name === cartItem.name)) return;
    users[login].cart?.push(cartItem);
    res.json(cartItem);
  });

  app.post("/api/updateCartItem", (req, res) => {
    const { login, name, platform, amount } = req.body;
    const updatedCart = users[login].cart?.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          selectedPlatform: platform || item.selectedPlatform,
          amount: amount || item.amount,
          price: +((amount || item.amount) * (item.price / item.amount)).toFixed(2),
        };
      }
      return item;
    });
    users[login].cart = updatedCart;
    res.json(updatedCart);
  });

  app.delete("/api/clearCart/:login", (req, res) => {
    const { login } = req.params;
    users[login].cart = [];
    res.status(200).end();
  });

  app.delete("/api/deleteCartItem", ({ query: { name, login } }: { query: { name: string; login: string } }, res) => {
    users[login].cart = users[login].cart?.filter((item) => item.name !== name);
    res.status(200).end();
  });

  app.post("/api/buy", (req, res) => {
    const { login, orderedItems } = req.body;
    users[login].order = orderedItems;
    users[login].cart = [];
    console.log(users[login]);
    res.status(200).end();
  });

  app.post("/testPostMock", (req, res) => {
    res.json({ body: req.body || null, success: true });
  });
});
