const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.get("/testListing",async (req,res)=>{
//     let samplelisting =new Listing ({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute ,Goa",
//         country:"India",
//     });
//     await samplelisting.save();
//     console.log("Sample was saved");
//     res.send("successful");
// })
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi, I am Groot");
});

//Index Route
app.get("/listing", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index", { allListing });
});
//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
