// Declaring requirements
const express = require("express");
const path = require("path");
const fs = require("fs");

// Creating an instance of express
const app = express();

// Adding a Port assigned by Heroku, or 3000 if avaliable
const PORT = process.env.PORT || 3000;

// Sets up data parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Adding a test route
app.get("/api/config", (req, res) => {
  res.json("Route created");
});

// Get route for notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Get route for reading db.json
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

// Post route for adding to db.json file
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    req.body.id = Date.now();
    const noteList = JSON.parse(data);
    noteList.push(req.body);
    console.log(noteList);
        fs.writeFile("./db/db.json", JSON.stringify(noteList), (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
        });
    res.json(req.body);
  });
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const noteList = JSON.parse(data);
        const noteId = req.params.id;
        const newList = noteList.filter(note => {
            return note.id != noteId;
        });
        console.log(newList);
            fs.writeFile("./db/db.json", JSON.stringify(newList), (err) => {
            if (err) throw err;
            console.log("The file has been deleted!");
            });
        res.end();
      });
});


// Get route for wildcard
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listening on assigned Port
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
