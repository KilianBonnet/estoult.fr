import React, { useState, useEffect } from 'react';
import { getUser } from './chatClient';

function Chat() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser().then(user => {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    });
  }, []);

  return(
  <div className="Chat">
    <h1>Hello {user !== undefined ? user.username : ""}</h1>
    <input type="text" id="lname" name="lname"></input>
  </div>
  )
}

export default Chat;
