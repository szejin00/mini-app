"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const catLogo = "/image/cat.png";

  useEffect(() => {
    const setMode = localStorage.getItem("darkMode");
    if (setMode === "true") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  /*const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/users",
  });*/

  const handleLogIn = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = response.data;
      const foundUser = users.find((user) => user.email === email);
      if (foundUser) {
        const token = `token-${email}-${Date.now()}`;
        login(email, token, foundUser.name);
        setErrorMsg("");
        console.log("user found:", foundUser);
        console.log(token);
        router.push("/dashboard");
      } else {
        console.log("user not found.");
        setErrorMsg("Invalid email or password");
      }
    } catch (error) {
      setErrorMsg("There is an error occured");
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Cat Logo"
          src={catLogo}
          className="mx-auto h-32 w-auto"
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-semibold tracking-tight text-gray-700">
          Sign in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-500"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-500"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-violet-500 hover:text-violet-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleLogIn();
              }}
              className="flex w-full justify-center rounded-md bg-violet-500 px-3 py-1.5 text-sm/6 text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              Sign in
            </button>
          </div>
        </form>
        {errorMsg && (
          <p className="block text-sm/6 font-medium text-red-500">{errorMsg}</p>
        )}

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold text-violet-500 hover:text-violet-400"
          >
            Register an account
          </a>
        </p>
      </div>
    </div>
  );
}
