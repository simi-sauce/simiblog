const { createServer } = require("http");
const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// Create server class
class Server extends createServer {
  constructor(app, port) {
    super();
    this.port = port;
    this.app = app;

    createServer(this.app).listen(this.port, () => {
      console.log(`Node is listening on ${this.port}`);
    });
  }
}

// Connect MONGO DB
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB connected"));

// sever listen.
const server_one = new Server(app, process.env.PORT || 5000).listen();

// Node Error Handing
//

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server_one.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  server_one.close(() => {
    process.exit(1);
  });
});
