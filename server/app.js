const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const dotenv = require("dotenv");
dotenv.config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ickjmznffvkgvbiylfrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("movie").select(`
    *
  `);

  console.log(data);
  res.send(error ? error : data);
});

app.post("/login", async (req, res) => {
  const { data, error } = await supabase
    .from("user")
    .select(
      `
    username, password
  `
    )
    .eq("username", req.body?.username)
    .eq("password", req.body?.password);

  if (error) {
    res.status(500).send(error);
  }

  if (data !== []) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404).send("Missing username or password");
  }

  const { data, error } = await supabase
    .from("user")
    .select("username")
    .eq("username", req.body?.username);

  if (data.length > 0) {
    res.status(403).send("Username already exists");
  } else {
    const { data, error } = await supabase.from("user").insert({
      username: req.body?.username,
      password: req.body?.password,
    });

    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
