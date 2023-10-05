import { Router } from "express";

const r = Router();

r.post("/login", (req, res) => {
  res.send("login");
});

export default r;
