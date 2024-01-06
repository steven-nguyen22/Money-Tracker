import { useState } from "react";
import Nav from "./Components/Nav";

function App() {
  const [username, setUserName] = useState("");

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify({
        username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUserName("");
  }

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <form onSubmit={handleCreateUser}>
          <label htmlFor="user-title">User</label>
          <input
            id="user-title"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(e.target.value);
            }}
          />
          <button>Create User</button>
        </form>
      </div>
    </div>
  );
}

export default App;
