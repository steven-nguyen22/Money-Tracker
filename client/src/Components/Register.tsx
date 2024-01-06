import { useState } from "react";
import Nav from "./Nav";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("registration successful");
    } else {
      alert("registration failed, account name already exists");
    }
  }

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
