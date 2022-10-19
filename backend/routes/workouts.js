const express = require('express');
const{createWorkout, getWorkouts, getWorkout,deleteWorkout,updateWorkout}=require('../Controller/workoutController')
const requireAuth=require('../middleware/requireAuth')


const router =express.Router();
router.use(requireAuth)

//get all workouts
router.get('/', getWorkouts)

//single workout
router.get('/:id', getWorkout) 

//post a new workout
router.post('/', createWorkout)

//delete a workout
router.delete('/:id', deleteWorkout)

//update a workout
router.patch('/:id', updateWorkout)

module.exports=router;