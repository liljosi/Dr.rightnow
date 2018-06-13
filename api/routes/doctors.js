const router = require('express').Router()
const {
  createDoctor,
  getDoctorById,
  updateDoctorById,
  deleteDoctorById,
  updatePacientPaymentStatus,
  stopPaymentNotifications
} = require('../middleware/doctors')

router.route('/doctors')
.post(createDoctor)

router.route('/doctors/:id')
.get(getDoctorById)
.put(updateDoctorById)
.delete(deleteDoctorById)

router.route('/doctors/:id/charges/:chargeId')
.put(updatePacientPaymentStatus)

router.route('/doctors/:id/settings')
.put(stopPaymentNotifications)

module.exports = router
