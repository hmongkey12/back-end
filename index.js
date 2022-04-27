const express = require("express");
const server = express();

const PORT = 3000 || process.env.PORT;

if (PORT) {
  server.listen(PORT, () => {
    console.log(`server listening ${PORT}`);
  });
}

server.get("/dao", (req, res) => {
  res.send("<h1>Hi Dao, you the best.</h1>");
});
