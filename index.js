const app = require("./app/server");
app.listen(process.env.PORT, () => {
  console.log("server is run on: " + process.env.PORT);
});
