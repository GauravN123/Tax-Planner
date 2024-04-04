import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UserCard(data) {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleShowHistory = () => {
    console.log(data.calculation._id);
    navigate("/taxcalculation", { calculationId: data.calculation._id });
  };
  const handleDelete = () => {
    data.onDelete(data.calculation._id); // Call delete function with card ID
  };

  return (
    <div className="px-3 py-3 max-w-xl mx-auto">
      {currentUser ? (
        <>
          <div
            className="card"
            style={({ width: "10px" }, { background: "white" })}
          >
            <div className="card-body">
              <h5 className="card-heading">
                <b>{data.calculation.name}</b>
              </h5>
              <div
                className="butt"
                style={
                  ({ margin: "20px" },
                  { padding: "0px" },
                  { fontfontSize: "1px" })
                }
              >
                <Link
                  to={`/taxcalculation/${data.calculation._id}`}
                  className="btn btn-primary"
                  style={
                    ({ padding: "5px" },
                    { marginTop: "10px" },
                    { marginLeft: "0px" })
                  }
                >
                  Show History
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                  style={({ padding: "4px" }, { margin: "20px" })}
                >
                  <a href="#">Delete</a>
                </button>
              </div>
              <div className="butt"></div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
