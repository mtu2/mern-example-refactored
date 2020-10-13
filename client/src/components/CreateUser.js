import React, { useState } from "react";
import API from "../utils/API";

function CreateUser() {
  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => setUsername(e.target.value);

  async function onSubmit(e) {
    e.preventDefault();
    await API.createUser({ username });
    setUsername("");
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
