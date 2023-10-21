const express = require('express');
const router = express.Router();
const{createUser,login,addCar,updateCarInfo,deleteCarInfo} = require("../controllers/admin.controller");

router.post('/register',createUser);
router.post('/login', login);
router.post('/addCar', addCar);
router.put('/updateCar/:carId',updateCarInfo );
router.delete('/removeCar/:carId',deleteCarInfo);
    

module.exports = router;
