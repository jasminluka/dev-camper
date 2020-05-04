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

// @route   GET api/v1/reviews/:id
// @desc    Get a single review
// @access  Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  // Formatted ObjectId but not found on DB
  if (!review) {
    return next(new ErrorResponse(`No review with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: review
  });
});

// @route   POST api/v1/bootcamps/:bootcampId/reviews
// @desc    Add a review
// @access  Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404));
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});