import React, { useState, useEffect } from "react";
import API from "../utils/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // styling

function CreateExercise() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsernames() {
      const res = await API.getUsers();
      if (res.data.length > 0) {
        setUsers(res.data.map((user) => user.username));
        setUsername(res.data[0].username);
      }
    }
    fetchUsernames();
  }, []);

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeDescription = (e) => setDescription(e.target.value);
  const onChangeDuration = (e) => setDuration(e.target.value);
  const onChangeDate = (date) => setDate(date);

  async function onSubmit(e) {
    e.preventDefault();
    const exerciseData = {
      username,
      description,
      duration,
      date,
    };
    await API.createExercise(exerciseData);
    window.location = "/";
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
