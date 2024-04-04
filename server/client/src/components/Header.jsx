import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [taxPath, setTaxPath] = useState(false);
  const [calcPath, setCalcPath] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/taxcalculation")) {
      setTaxPath(true);
      setCalcPath(false);
    } else if (location.pathname === "/calculationhistory") {
      setTaxPath(false);
      setCalcPath(true);
    } else {
      setTaxPath(false);
      setCalcPath(false);
    }
  }, [location.pathname]);

  return (
    <div className="bg-slate-200 sticky top-0 z-50">
      <div className="flex justify-between  max-w-6xl mx-auto p-3 items-center">
        <Link to="/">
          <h1 className="font-bold">Tax Planner</h1>
        </Link>
        <ul className="flex gap-4 list-none">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          {currentUser ? (
            <li className="flex ">
              {taxPath && (
                <Link to="/calculationhistory">Calculation History</Link>
              )}
              {calcPath && <Link to="/taxcalculation">Tax Calculation</Link>}
              <Link to="/profile">
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover ml-2 cursor-pointer "
                />
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/profile">Sign In</Link>
            </li>
          )}
          <li>
            <Link to="/sign-up">{currentUser ? null : "Sign Up"}</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
