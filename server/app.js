const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;

const dotenv = require("dotenv");
dotenv.config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ickjmznffvkgvbiylfrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const cors = require("cors");
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("movie").select(`
    *
  `);

  res.send(error ? error : data);
});

app.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("movie")
    .select(
      `
    *
  `
    )
    .match({ id: req.params.id });

  res.send(error ? error : data);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body.data;

  if (!username || !password) {
    res.status(404).send("Missing username or password");
    return;
  }

  const { data, error } = await supabase
    .from("user")
    .select(`*`)
    .eq("username", username)
    .eq("password", password);

  if (error) {
    res.status(500).send(error);
    return;
  }

  if (data.length > 0) {
    res.status(200).send(data);
  } else {
    res.status(403).send("Username or password is incorrect");
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body.data;

  if (!username || !password) {
    res.status(404).send("Missing username or password");
    return;
  }

  const { data, error } = await supabase
    .from("user")
    .select("username")
    .eq("username", username);

  if (error) {
    console.log(error);
    res.send(error);
    return;
  }

  if (data.length > 0) {
    res.status(403).send("Username already exists");
  } else {
    const { data, error } = await supabase.from("user").insert({
      username,
      password,
    });

    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  }
});

app.post("/getwishlist", async (req, res) => {
  const wishlists = await supabase
    .from("wishlist")
    .select(`movie_id`)
    .eq("user_id", req.body.data.user_id);

  if (wishlists.error) {
    res.status(500).send(wishlists.error);
    return;
  }

  if (wishlists.data.length > 0) {
    const wishlist = wishlists.data[0].movie_id;
    const { data, error } = await supabase.from("movie").select(`*`);
    const datafiltered = data.filter((datum) => wishlist.includes(datum.id));
    res.send(datafiltered);
  } else {
    res.send([])
  }
});

app.patch("/updatewishlist", async (req, res) => {
  const { user_id, movie_id } = req.body.data;

  if (!user_id || !movie_id) {
    res.status(404).send("Missing username or movie_id");
    return;
  }

  let { data, error } = await supabase
    .from("wishlist")
    .select(
      `
    user_id, movie_id
  `
    )
    .eq("user_id", user_id);

  if (error) {
    res.status(500).send(error);
    return;
  }
  
  if (data.length > 0) {
    let new_movie_id = data[0].movie_id;
    if (data[0].movie_id.includes(movie_id)) {
      res.status(200);
    } else {
      let { data, error } = await supabase
      .from("wishlist")
      .update({
        movie_id: [...new_movie_id, movie_id],
      })
      .eq("user_id", user_id);
      
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(data);
      }
    }
  } else {
    let { data, error } = await supabase
      .from("wishlist")
      .insert([{ user_id: user_id, movie_id: [movie_id] }]);
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  }
});

app.delete("/deletewishlist", async (req, res) => {
  const { user_id, movie_id } = req.body;

  if (!user_id || !movie_id) {
    res.status(404).send("Missing username or movie_id");
    return;
  }

  let { data, error } = await supabase
    .from("wishlist")
    .select(
      `
    user_id, movie_id
  `
    )
    .eq("user_id", user_id);

  if (error) {
    res.status(500).send(error);
    return;
  }

  let new_movie_id = data[0].movie_id;

  if (data.length > 0) {
    let { data, error } = await supabase
      .from("wishlist")
      .update({
        movie_id: new_movie_id.filter((id) => id !== movie_id),
      })
      .eq("user_id", user_id);

    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  } else {
    res.status(404).send("No movie in wishlist");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
