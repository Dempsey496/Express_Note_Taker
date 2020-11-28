// Declaring requirements
const express = require("express");
const path = require("path");

// Creating an instance of express
const app = express();

// Adding a Port assigned by Heroku, or 8080 if avaliable
const PORT = process.env.PORT || 3000;

// Adding a test route
app.get("/api/config", (req, res) => {
    res.json("Route created");
});

// Listening on assigned Port
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});