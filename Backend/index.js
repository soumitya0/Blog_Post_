const express = require("express");
const app = express();

const connectDB = require("./config/dbconnection");
connectDB();

//Express Middle ware
app.use(express.json({ extended: false }));

//define route
app.use("/api/login", require("./Routes/login"));
app.use("/api/register", require("./Routes/register"));
app.use("/api/addPost", require("./Routes/addPost"));
app.use("/api/user", require("./Routes/user"));
app.use("/api/post", require("./Routes/post"));

app.listen(5004, () => {
  console.log("i am working 5004 ");
});
