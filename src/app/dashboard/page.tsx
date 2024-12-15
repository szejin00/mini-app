"use client";

import SideNav from "./sidenav";
import GameCard from "./gamecard";
import { useState, useEffect } from "react";
import { useAuth } from "../authContext";

export default function DashBoard() {
  const { user } = useAuth();
  return (
    <div>
      <div id="dashHeader">
        <header className="w-screen justify-center items-center text-center relative">
          <h1 className="text-2xl inline-block p-6">Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </header>
      </div>
      <SideNav />
      <GameCard />
    </div>
  );
}
