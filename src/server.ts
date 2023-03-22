import express from "express";
import "dotenv";

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello World!");
});

const port = process.env.SERVER_PORT || 3333;

app.listen(port, () => console.log(`Server started at http://localhost:${3333} 🔥`));