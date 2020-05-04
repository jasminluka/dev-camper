const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/async');

// @route   GET api/v1/courses
// @route   GET api/v1/bootcamps/:bootcampId/courses
// @desc    Get all courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  // For a specific bootcamp
  if (req.params.bootcampId) {
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
      return next(new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404));
    }

    const courses = await Course.find({ bootcamp });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  }
  else {
    res.status(200).json(res.advancedResults);
  }
});

// @route   GET api/v1/courses/:id
// @desc    Get a single course
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  // Formatted ObjectId but not found on DB
  if (!course) {
    return next(new ErrorResponse(`No course with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

// @route   POST api/v1/bootcamps/:bootcampId/courses
// @desc    Add new course
// @access  Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404));
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course
  });
});

// @route   PUT api/v1/courses/:id
// @desc    Update course
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse(`No course with id of ${req.params.id}`, 404));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  // In order to run post save middleware
  await course.save();

  res.status(200).json({
    success: true,
    data: course
  });
});

// @route   DELETE api/v1/course/:id
// @desc    Delete course
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse(`No course with id of ${req.params.id}`, 404));
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});