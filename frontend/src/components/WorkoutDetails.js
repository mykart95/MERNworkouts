import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
const WorkoutDetails = ({workout}) => {
  const{user}=useAuthContext()
  const {dispatch}=useWorkoutsContext();
  const handleDelete= async()=>{
    if(!user){
      return
    }
    const response=await fetch('/api/workouts/' +workout._id, {
    method: 'DELETE',
    headers:{
      'Authorization':`Bearer ${user.token}`
    }
  })
  
  const json=await response.json()
  if(response.ok){
    dispatch({type:'DELETE_WORKOUT', payload: json})
  }
}
    return ( 
        <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Number of reps: </strong>{workout.reps}</p>
        <p>{workout.createdAt}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true} )}</p>
        <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>
      </div>
     );
}
 
export default WorkoutDetails