const eventEmitter = require("events");

const customEmitter = new eventEmitter();

customEmitter.on("response", (name, id) => {
  console.log(`data recieved from ${name} and customer id is ${id}`);
});

customEmitter.emit("response", "john", 23);
