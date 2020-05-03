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

const { protect, authorize } = require('../../../middlewares/auth');

const Bootcamp = require('../../../models/Bootcamp');
const advancedResults = require('../../../middlewares/advancedResults'); 

// Include other resource routers
const courseRouter = require('./courses');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), photoUploadBootcamp);

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

module.exports = router;