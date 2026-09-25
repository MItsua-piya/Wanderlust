const express = require("express");
const router = express.Router();

const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsycn.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController=require("../controllers/listing.js");
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// index
router.get(
  "/listings",
  wrapAsync(listingController.index),
);

// new route
router.get("/listings/new", isLoggedIn,listingController.renderNewForm);

// show route
router.get(
  "/listings/:id",
  wrapAsync(listingController.showListing),
);

// create
router.post(
  "/listings",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing),
);

// edit route
router.get(
  "/listings/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.RenderEditForm),
);

// update route
router.put(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);

// delete route
router.delete(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing),
);

module.exports = router;
