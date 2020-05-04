const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/async');

// @route   GET api/v1/reviews
// @route   GET api/v1/bootcamps/:bootcampId/reviews
// @desc    Get all reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  // For a specific bootcamp
  if (req.params.bootcampId) {
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
      return next(new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404));
    }

    const reviews = await Review.find({ bootcamp });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  }
  else {
    res.status(200).json(res.advancedResults);
  }
});