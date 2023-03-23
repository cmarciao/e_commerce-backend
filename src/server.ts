import express from "express";
import "dotenv";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

const port = process.env.SERVER_PORT || 3333;

app.listen(port, () => console.log(`Server started at http://localhost:${port}. 🔥`));