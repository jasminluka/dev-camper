// @route   GET api/v1/bootcamps
// @desc    Get all bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).send(`All Bootcamps`);
}

// @route   GET api/v1/bootcamps/:id
// @desc    Get a single bootcamp
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).send(`Bootcamp ${req.params.id}`);
}

// @route   POST api/v1/bootcamps
// @desc    Create new bootcamp
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).send(`Create bootcamp`);
}

// @route   PUT api/v1/bootcamps/:id
// @desc    Update bootcamp
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).send(`Update bootcamp`);
}

// @route   DELETE api/v1/bootcamps/:id
// @desc    Delete bootcamp
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).send(`Delete bootcamp`);
}