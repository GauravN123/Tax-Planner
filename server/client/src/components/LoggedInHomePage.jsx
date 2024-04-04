import React from "react";
import "./css/LoggedInHomePage.css";

export default function LoggedInHomePage() {
  return (
    <>
      <div className="header">
        <p>
          <h1>SELECT FROM THE TWO OPTIONS AVAILABLE BELOW</h1>
        </p>
      </div>
      <div className="main">
        <div className="row">
          <div className="col-sm-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Calculate Tax</h5>
                <p className="card-text">
                  Get some awesome ideas to save your taxes.
                </p>
                <a href="/taxcalculation" className="btn btn-primary">
                  Click Here
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Calculation History</h5>
                <div className="card-text2">
                  <p className="card-text">
                    Check your previous tax calculations. <br />
                  </p>
                </div>
                <a href="/calculationhistory" className="btn btn-primary">
                  Click Here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
