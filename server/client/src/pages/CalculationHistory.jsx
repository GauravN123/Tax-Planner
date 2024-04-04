import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard.jsx";
import "./css/calculationhistory.css";
import axios from "axios";

export default function CalculationHistory() {
  const { currentUser } = useSelector((state) => state.user);
  const [calculationHistory, setCalculationHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${window.location.origin}/api/calculationhistory`
        );
        setCalculationHistory(response.data.CalculationHistory);
        console.log(response.data.CalculationHistory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const deleteHistory = async (calculationid) => {
    try {
      console.log(calculationid);
      // const { ObjectId } = require("mongodb");

      // const objectId = new ObjectId("660336c7c56237b666d68a6a");
      //   const hexString = objectId.toHexString();
      const response = await axios.delete(
        `${window.location.origin}/api/calculationhistory/${calculationid}`
      );
      setCalculationHistory(
        calculationHistory.filter(
          (calculationHistory) => calculationHistory._id !== calculationid
        )
      );
      console.log("Delete operation successful:", response.data);
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };
  return (
    <div>
      {currentUser && calculationHistory.length ? (
        <div className="calculation-history">
          <h1 className="calculation-history-heading">
            <b>Calculation History</b>
          </h1>
          {calculationHistory.map((calculation) => (
            <UserCard
              key={calculation._id}
              calculation={calculation}
              onDelete={(calculationid) => deleteHistory(calculationid)}
            />
          ))}
        </div>
      ) : (
        <h1 className="calculation-history-heading">
          <b>Calculation History</b>
          <br />
          <br />
          <p>No data found..!!</p>
        </h1>
      )}
    </div>
  );
}
