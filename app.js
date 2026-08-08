const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
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
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Hi, I am Groot");
});

//Index Route
app.get("/listings", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index", { allListing });
});
//new route
// New route - show the form
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});
//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

//create
app.post("/listings", async (req, res) => {
  // let {title,descrption,image,price,country,location}=req.//body;
  const newListing = new Listing(req.body.Listing);

  await newListing.save();
  res.redirect("/listings");
});
//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});
//update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
  res.redirect("/listings/show");
});
//delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
