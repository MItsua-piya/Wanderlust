const path = require("path");
if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const dbUrl = process.env.ATLASDB_URL;

// Paste a REAL user _id from your Atlas "users" collection
const OWNER_ID = "6aba9df30b012aa2902008af";

// Listings with this owner are deleted before re-seeding.
// First run: the old broken ID. Later runs: set this to OWNER_ID so the script can be re-run.
const OLD_SEED_OWNER = "6ab415642d7b4c7a75ad959e";

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to DB");
}

const initDB = async () => {
  // 1. Delete old seed listings and their reviews
  const oldListings = await Listing.find({ owner: OLD_SEED_OWNER });
  const reviewIds = oldListings.flatMap((l) => l.reviews);

  await Review.deleteMany({ _id: { $in: reviewIds } });
  const del = await Listing.deleteMany({ owner: OLD_SEED_OWNER });
  console.log("Deleted old listings:", del.deletedCount);

  // 2. Geocode and insert the fresh listings
  for (let obj of initdata.data) {
    const response = await geocodingClient
      .forwardGeocode({
        query: `${obj.location}, ${obj.country}`,
        limit: 1,
      })
      .send();

    obj.geometry = response.body.features[0].geometry;
    obj.owner = OWNER_ID;
  }

  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};

main()
  .then(initDB)
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
