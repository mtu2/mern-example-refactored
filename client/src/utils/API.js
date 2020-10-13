import axios from "axios";

export default {
  // User AJAX requests
  getUsers: () => axios.get("/api/user"),
  createUser: (userData) => axios.post("/api/user", userData),

  // Exercise AJAX requests
  getExercises: () => axios.get("/api/exercise"),
  getExercise: (id) => axios.get(`/api/exercise/${id}`),
  createExercise: (exerciseData) => axios.post("api/exercise", exerciseData),
  updateExercise: (id, exerciseData) =>
    axios.put(`/api/exercise/${id}`, exerciseData),
  deleteExercise: (id) => axios.delete(`/api/exercise/${id}`),
};
