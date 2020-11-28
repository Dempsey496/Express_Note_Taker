// Declaring requirements
const express = require("express");
const path = require("path");

// Creating an instance of express
const app = express();

// Adding a Port assigned by Heroku, or 8080 if avaliable
const PORT = process.env.PORT || 3000;

// Sets up data parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Adding a test route
app.get("/api/config", (req, res) => {
    res.json("Route created");
});

// Get route for notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Get route for home page
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Get route for reading db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "db/db.json"));
});
// NEEDS WORK


// Listening on assigned Port
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});