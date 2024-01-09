import { useContext, useEffect, useState } from "react";
import Nav from "./Components/Nav";
import { UserContext } from "./UserContext";
import CreatePost from "./Components/CreatePost";
import WelcomePage from "./Components/WelcomePage";

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
      {!username && (
        <div className="bg-test bg-cover bg-no-repeat bg-center">
          <WelcomePage />
        </div>
      )}
    </div>
  );
}

export default App;
