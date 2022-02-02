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

app.get("/:id", async (req, res) => {
  const { data, error } = await supabase.from("movie").select(`
    *
  `).match({ id: req.params.id });

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

  if (data.length > 0) {
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

app.get("/getwishlist", async (req, res) => {
  const wishlists = await supabase
    .from("wishlist")
    .select(`movie_id`)
    .eq("user_id", req.body?.user_id);

  if (wishlists.error) {
    res.status(500).send(error);
  }

  const wishlist = wishlists.data[0].movie_id;
  const { data, error } = await supabase.from("movie").select(`*`);
  const datafiltered = data.filter((datum) => wishlist.includes(datum.id));

  res.send(datafiltered);
});

app.patch("/updatewishlist", async (req, res) => {
  const { user_id, movie_id } = req.body;

  if (!user_id || !movie_id) {
    res.status(404).send("Missing username or movie_id");
  }

  const { data, error } = await supabase
    .from("wishlist")
    .select(`
    user_id, movie_id
  `)
    .eq("user_id", user_id);

  if (error) {
    res.status(500).send(error);
  }

  if (data.length > 0) {
    const { data1, error1 } = await supabase
      .from("wishlist")
      .update({
        movie_id: [...data[0].movie_id, movie_id],
      })
      .eq("user_id", user_id);

    if (error1) {
      res.status(500).send(error1);
    } else {
      res.status(200).send(data1);
    }
  } else {
    const { data2, error2 } = await supabase
    .from('wishlist')
    .insert([
      { user_id: user_id, movie_id: [movie_id] },
    ])
    if (error2) {
      res.status(500).send(error2);
    } else {
      res.status(200).send(data2);
    }
  }
});

app.delete("/deletewishlist", async (req, res) => {
  const { user_id, movie_id } = req.body;

  if (!user_id || !movie_id) {
    res.status(404).send("Missing username or movie_id");
  }

  const { data, error } = await supabase
    .from("wishlist")
    .select(`
    user_id, movie_id
  `)
    .eq("user_id", user_id);

  if (error) {
    res.status(500).send(error);
  }

  if (data.length > 0) {
    const { data1, error1 } = await supabase
      .from("wishlist")
      .update({
        movie_id: data[0].movie_id.filter((id) => id !== movie_id),
      })
      .eq("user_id", user_id);

    if (error1) {
      res.status(500).send(error1);
    } else {
      res.status(200).send(data1);
    }
  } else {
    res.status(404).send("No movie in wishlist");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
