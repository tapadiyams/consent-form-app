const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "public")));

app.get("/instagram-photos", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://www.instagram.com/reliancestones/"
    );
    res.send(response.data);
  } catch (error) {
    console.error("Fetching Instagram photos failed", error);
    res.status(500).send("Error fetching Instagram photos");
  }
});

// Handle all other GET requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
