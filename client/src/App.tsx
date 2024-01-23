import { useContext, useEffect } from "react";
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
      {username && (
        <div className="h-screen bg-background1 bg-cover bg-no-repeat bg-center">
          <CreatePost />
          <div className="h-bgHeight bg-backgroundExtend"></div>
        </div>
      )}
      {!username && (
        <div className="bg-background1 bg-cover bg-no-repeat bg-center">
          <WelcomePage />
        </div>
      )}
    </div>
  );
}

export default App;
