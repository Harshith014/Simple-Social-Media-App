// UserList.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/allusers")
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error fetching users:", error));
    }, []);
    
    return (
        <div style={{padding: '20px 2px'}}>
            <h2>All Users</h2>

            <ul style={{listStyle:"none"}}>
                {users.map(user => (
                    <li key={user._id}>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
