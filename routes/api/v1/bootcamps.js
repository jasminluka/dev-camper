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

// Include other resource routers
const courseRouter = require('./courses');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router
  .route('/:id/photo')
  .put(photoUploadBootcamp);

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

module.exports = router;