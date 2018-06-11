const router = require('express').Router()
const {
  createDoctor,
  getDoctorById,
  updateUserById,
  deleteUserById
} = require('../middleware/doctors')

router.route('/doctors')
.post(createDoctor)

router.route('/doctors/:id')
.get(getDoctorById)
.put(updateUserById)
.delete(deleteUserById)


module.exports = router
