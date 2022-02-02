const express = require("express");
const app = express();
const port = 3000;

const dotenv = require("dotenv");
dotenv.config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ickjmznffvkgvbiylfrx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("wishlist").select(`
    id, user_id, movie_id
  `);

  console.log(data);
  console.log(error);

  res.send(error ? error : data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
