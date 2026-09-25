const express = require("express");
const router = express.Router({ mergeParams: true });

const { isreviewAuthor,isLoggedIn, validateReview } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsycn.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController=require("../controllers/review.js");

// POST review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

// DELETE review
router.delete(
  "/:reviewId",isLoggedIn,isreviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
