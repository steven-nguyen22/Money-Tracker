import { useState } from "react";
import Nav from "./Nav";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { logo } from "../assets";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [exists, setExists] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("https://budgetfy.onrender.com/register", {
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
      //alert("registration successful");
      setExists(false);
      setSuccess(true);
    } else {
      //alert("registration failed, account name already exists");
      setExists(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <Nav />
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto" src={logo} alt="Budgetfy" />
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

            {exists && (
              <span className="mt-3 text-sm text-red-500">
                Registration failed, account name already exists.
              </span>
            )}

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

            <p className="text-sm font-light text-black">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[color:blue] hover:underline"
              >
                Login here
              </Link>
            </p>

            {success && (
              <span className="mt-3 text-sm text-green-500">
                Account created successfully!
              </span>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
