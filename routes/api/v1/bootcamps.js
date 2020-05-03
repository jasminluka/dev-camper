const express = require('express');
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  getBootcampsInRadius,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  photoUploadBootcamp
} = require('../../../controllers/bootcamps');

const { protect } = require('../../../middlewares/auth');

const Bootcamp = require('../../../models/Bootcamp');
const advancedResults = require('../../../middlewares/advancedResults'); 

// Include other resource routers
const courseRouter = require('./courses');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

router
  .route('/:id/photo')
  .put(protect, photoUploadBootcamp);

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

module.exports = router;