const express = require("express");
require("dotenv").config();

const searchRouter = require("./routes/searchRouter");
const theaterRouter = require("./routes/theaterRouter");
const futureRouter = require("./routes/futureRouter");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/search", searchRouter);
app.use("/api/theater", theaterRouter);
app.use("/api/future", futureRouter);
// app.use("/api/top-actors", topActorsRouter); // TODO: implement top-actors route
// app.use("/api/actors", actorsRouter); // TODO: implement actors route

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
