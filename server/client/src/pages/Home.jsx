import React from "react";
import "./css/Home.css";
import LoggedInHomePage from "../components/LoggedInHomePage";
import { useSelector } from "react-redux";
export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      {currentUser ? (
        <LoggedInHomePage />
      ) : (
        <>
          <h1 className="text-3xl font-bold  mb-4 text-slate-800">
            Welcome to Tax Planner App
          </h1>
          <p className="mb-4 text-slate-700">
            This is a full stack tax planner web app. Here you can calculate
            your tax by giving by sharing income details and this app will
            suggest you best possible ways to save it.
          </p>
          <p className="mb-4 text-slate-700">
            <img
              className="home-img"
              src="https://5.imimg.com/data5/SV/WT/SZ/SELLER-8926540/tax-planning-png.png"
              alt=""
            />
          </p>
          <p className="mb-4 text-slate-700">
            To use this app please click on the sign in button in the top right
            or register if dont have account.
          </p>
        </>
      )}
    </div>
  );
}
