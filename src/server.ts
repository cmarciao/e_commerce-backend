import express from "express";

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello World!");
});

app.listen(3333, () => console.log("Server started at http://localhost:3333 🔥"));