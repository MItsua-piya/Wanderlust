const express = require("express");
const router = express.Router();

const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsycn.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

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
  wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index", { allListing });
  }),
);

// new route
router.get("/listings/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// show route
router.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing you requested for does not exsit");
      return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing });
  }),
);

// create
router.post(
  "/listings",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);

    // Store the logged-in user's ID as the owner
    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  }),
);

// edit route
router.get(
  "/listings/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing you requested for does not exsit");
      return res.redirect("/listings");
    }

    console.log(listing);
    res.render("listings/edit", { listing });
  }),
);

// update route
router.put(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  }),
);

// delete route
router.delete(
  "/listings/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);

    console.log(deletedListing);

    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  }),
);

module.exports = router;
