const http = require("http");
const { createReadStream } = require("fs");
const port = 5000;
const server = http.createServer();

const stream = createReadStream("./content/big.txt");

server.on("request", (req, res) => {
  res.end("Welcome");
});

stream.on("data", (result) => {
  console.log(result);
});

server.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
