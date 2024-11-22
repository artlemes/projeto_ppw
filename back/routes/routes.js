import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rota pública
routes.post("/login", (req, res) => {
  res.send("Login");
});

// Rotas privadas
routes.get("/users", (req, res) => {
  res.send("Users");
});

// 404 - Not Found
routes.use((req, res) => {
  res.status(404).send({ Msg: "404 - Not Found" });
});

export default routes;
