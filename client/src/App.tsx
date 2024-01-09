import { useContext, useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { UserContext } from "./UserContext";
import CreatePost from "./Components/CreatePost";

function App() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const username = userInfo?.username;

  return (
    <div>
      <div>
        <Nav />
      </div>
      {username && (
        <div>
          <CreatePost />
        </div>
      )}
      {!username && <h1>Welcome Page</h1>}
    </div>
  );
}

export default App;
