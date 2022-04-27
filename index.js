const express = require("express");
const server = express();

const PORT = 3000;

server.listen(PORT, () => {
  console.log("server listening...");
});

server.get("/dao", (req, res) => {
  res.send("<h1>Hi Dao, you the best.</h1>");
});
