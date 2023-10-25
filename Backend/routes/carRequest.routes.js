const express = require('express');
const router = express.Router();
const { addCar, updateCar,deleteCarInfo,viewAllCars } = require('../controllers/carRequest.controllers');
const { authenticateAdmin } = require('../middleware/admin.middleware')

router.post('/add', authenticateAdmin, addCar)
router.put('/update/:carId', authenticateAdmin, updateCar)
router.delete('/delete/:carId', authenticateAdmin,deleteCarInfo)
router.get('/all',viewAllCars)

module.exports = router;
