if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "../.env" });
}

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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

const initDB = async () => {
  await Listing.deleteMany({});

  for (let obj of initdata.data) {
    const response = await geocodingClient
      .forwardGeocode({
        query: `${obj.location}, ${obj.country}`,
        limit: 1,
      })
      .send();

    obj.geometry = response.body.features[0].geometry;
    obj.owner = "6ab415642d7b4c7a75ad959e";
  }

  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};

initDB();
