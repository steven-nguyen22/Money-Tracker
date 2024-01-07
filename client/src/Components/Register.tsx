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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Signup Now
          </h1>
        </div>
        <div className="">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-5" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium leading-6 text-black">
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-green3 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-green1 sm:text-sm sm:leading-6"
                  type="text"
                  placeholder=" username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-black">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-green3 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-green1 sm:text-sm sm:leading-6"
                    type="password"
                    placeholder=" password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <button className="flex w-full justify-center rounded-md bg-gray1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green1">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
