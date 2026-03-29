const app = require("./src/app");
const  connectDB  = require("./db/db");

// connectDB()

// const app = require("./src/app");

app.get("/", (req, res) => {
  res.send("OK WORKING");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

// app.listen(process.env.PORT || 3000, () => {
//     console.log(`Server is running on port ${process.env.PORT || 3000}`);
// });