// dependencies.
const express = require("express");

// routes.
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// express server
const app = express();

// port set up heroku or local
const PORT = process.env.PORT || 3000;

// express things
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

// route triggers
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// server trigger
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));