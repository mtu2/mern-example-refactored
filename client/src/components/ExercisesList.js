import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${props.exercise._id}`}>edit</Link> |{" "}
      <a
        href="#" // best practice would to refactor this as a button since href does not go anywhere
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const res = await API.getExercises();
        setExercises(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchExercises();
  }, []);

  async function deleteExercise(id) {
    await API.deleteExercise(id);
    setExercises(exercises.filter((item) => item._id !== id));
  }

  function exerciseList() {
    return exercises.map((currentExercise) => (
      <Exercise
        exercise={currentExercise}
        deleteExercise={deleteExercise}
        key={currentExercise._id}
      />
    ));
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
}

export default ExercisesList;
