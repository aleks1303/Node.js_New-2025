import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/users").then(({data}) => setUsers(data))
  }, [])
    return (
        <div>
          <h1 style={{color: "blue"}}>Users: </h1>
            {
                users.map(user => <div key={user._id}>{user.name} {user.surname}</div>)
            }
        </div>
    );
};

export { App };