const app = require("./src/app");

app.get("/", (req, res) => {
  res.send("OK WORKING");
});
const PORT = process.env.PORT || 3000;
console.log("PORT:", PORT);
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});