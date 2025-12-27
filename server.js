console.log("API KEY:", process.env.SERP_API_KEY ? "OK (exists)" : "NOT SET");

const express = require("express");
const { getJson } = require("serpapi");

const app = express();
app.use(express.static("."));

app.get("/search", (req, res) => {
  const q = req.query.q;
  getJson({
    q,
    engine: "google",
    google_domain: "google.com",
    gl: "cz",
    hl: "cs",
    num: 10,
    api_key: process.env.SERP_API_KEY
  }, (json) => {
    const organic = json.organic_results || [];
    const clean = organic.map(r => ({
      position: r.position,
      title: r.title,
      link: r.link,
      snippet: r.snippet
    }));
    res.json(clean);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server běží na portu " + port));
