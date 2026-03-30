const app = require("./src/app");

app.get("/", (req, res) => {
  res.send("OK WORKING");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});