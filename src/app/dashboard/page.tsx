"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import { useRouter } from "next/navigation";

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const linkStyle =
    "block py-2 px-4 rounded-lg hover:bg-violet-500 hover:transition-all duration-200";
  const navStyle =
    "h-screen bg-gradient-to-r from-gray-900 to-black text-white fixed top-0 left-0 p-6";
  const navIconStyle =
    "block py-2 px-4 rounded-lg hover:transition-all duration-200";

  const menuOpen = (
    <svg
      className="h-8 w-8 text-red-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const menuClose = (
    <svg
      className="h-8 w-8 text-red-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const darkIcon = (
    <svg
      className="h-8 w-8 text-zinc-500 hover:text-sky-500"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" />{" "}
      <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" />
    </svg>
  );

  const lightIcon = (
    <svg
      className="h-8 w-8 text-sky-500 hover:text-zinc-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <circle cx="12" cy="12" r="5" /> <line x1="12" y1="1" x2="12" y2="3" />{" "}
      <line x1="12" y1="21" x2="12" y2="23" />{" "}
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />{" "}
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />{" "}
      <line x1="1" y1="12" x2="3" y2="12" />{" "}
      <line x1="21" y1="12" x2="23" y2="12" />{" "}
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />{" "}
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );

  const handleLogOut = () => {
    logout();
    router.push("/");
  };

  return (
    <div>
      <button
        className="fixed top-4 left-4 p-2 bg-transparent rounded z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? menuClose : menuOpen}
      </button>
      <div
        id="sideBar"
        className={`${navStyle} w-64 sm:w-48 lg:w-64 transform transition-transform duration-300 ${
          isOpen
            ? "translate-x-0 z-40 pointer-events-auto"
            : "-translate-x-40 z-[-1] pointer-events-none"
        }`}
      >
        <ul className="space-y-4 mt-16">
          <li>
            <Link href="/" className={linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/profile" className={linkStyle}>
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogOut();
              }}
              className={linkStyle}
            >
              Log out
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleDarkMode();
              }}
              className={navIconStyle}
            >
              {darkMode ? lightIcon : darkIcon}
            </Link>
          </li>
        </ul>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default function DashBoard() {
  const { user } = useAuth();
  return (
    <div>
      <div id="dashHeader">
        <header className="w-screen justify-center items-center text-center relative">
          <h1 className="text-2xl text-gray-500 inline-block p-6">Dashboard</h1>
          <p className="text-gray-500">Welcome, {user?.name}</p>
        </header>
      </div>
      <SideNav />
    </div>
  );
}
