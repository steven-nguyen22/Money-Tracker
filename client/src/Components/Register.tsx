import { useState } from "react";
import Nav from "./Nav";
import { motion } from "framer-motion";

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
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder=" username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green1 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  placeholder=" password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green1 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="flex w-full justify-center rounded-md bg-green4 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-green1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green4"
              >
                Register
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
