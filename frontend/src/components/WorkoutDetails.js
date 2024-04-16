import React from "react";

const WorkoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>
      <p>
        <strong>Load (kg): {workout.load}</strong>
      </p>
      <p>
        <strong>Reps : {workout.reps}</strong>
      </p>
      <p>{workout.createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
