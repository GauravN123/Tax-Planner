import React, { useState, useEffect } from "react";
import "./css/TaxCalculator.css";
import Result from "../components/Result";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

export default function TaxCalculator() {
  // const location = useLocation();
  // const [calculationid, setCalculationId] = useState("");
  // if (location.state != null) {
  //   setCalculationId(location.state);
  // }
  const location = useLocation();
  console.log(location);
  // const { calculationid } = location.state;
  const { calculationid } = useParams();
  console.log(calculationid);

  const { currentUser } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [basicSalary, setBasicSalary] = useState();
  const [da, setDa] = useState();
  const [hra, setHra] = useState();
  const [otherAllowances, setOtherAllowances] = useState({
    value: "",
    enabled: false,
  });
  const [deposits, setDeposits] = useState({ value: "", enabled: false });
  const [otherIncome, setOtherIncome] = useState({ value: "", enabled: false });
  const [medical, setMedical] = useState({
    value: "",
    enabled: false,
  });
  const [HomeLoan, setHomeLoan] = useState({ value: "", enabled: false });
  const [EducationLoan, setEducationLoan] = useState({
    value: "",
    enabled: false,
  });
  const [NPS, setNPS] = useState({ value: "", enabled: false });
  const [id, setId] = useState(calculationid);
  const [oldTaxDetails, setOldTaxDetails] = useState({});
  const [newTaxDetails, setNewTaxDetails] = useState({});
  const [taxSavingDetails, setTaxSavingDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Scroll to the result-box div once it appears
      const element = document.getElementById("result-box");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(calculationid);
        const response = await axios.post(
          `${window.location.origin}/api/taxcalculation/${calculationid}`
        );
        console.log(response.data.calculationHistory);
        setName(response.data.calculationHistory.name);
        setBasicSalary(response.data.calculationHistory.basicSalary);
        setDa(response.data.calculationHistory.da);
        setHra(response.data.calculationHistory.hra);
        if (response.data.calculationHistory.otherAllowances != null)
          setOtherAllowances({
            value: response.data.calculationHistory.otherAllowances,
            enabled: true,
          });
        if (response.data.calculationHistory.deposits != null)
          setDeposits({
            value: response.data.calculationHistory.deposits,
            enabled: true,
          });
        if (response.data.calculationHistory.otherIncome != null)
          setOtherIncome({
            value: response.data.calculationHistory.otherIncome,
            enabled: true,
          });
        if (response.data.calculationHistory.medical != null)
          setMedical({
            value: response.data.calculationHistory.medical,
            enabled: true,
          });
        if (response.data.calculationHistory.homeLoan != null)
          setHomeLoan({
            value: response.data.calculationHistory.homeLoan,
            enabled: true,
          });
        if (response.data.calculationHistory.educationLoan != null)
          setEducationLoan({
            value: response.data.calculationHistory.educationLoan,
            enabled: true,
          });
        if (response.data.calculationHistory.nps != null)
          setNPS({
            value: response.data.calculationHistory.nps,
            enabled: true,
          });
        setId(response.data.calculationHistory.otherAllowances._id);
        // Assuming response.data contains the tax calculation data
      } catch (error) {
        console.error("Error fetching tax data:", error);
      }
    };

    fetchData();
  }, [calculationid]);
  const sendDataToEndpoint = async (event) => {
    const data = {
      name: name,
      basicSalary: basicSalary,
      da: da,
      hra: hra,
      otherAllowances: otherAllowances.enabled ? otherAllowances.value : null,
      deposits: deposits.enabled ? deposits.value : null,
      otherIncome: otherIncome.enabled ? otherIncome.value : null,
      medical: medical.enabled ? medical.value : null,
      homeLoan: HomeLoan.enabled ? HomeLoan.value : null,
      educationLoan: EducationLoan.enabled ? EducationLoan.value : null,
      nps: NPS.enabled ? NPS.value : null,
      id: id,
    };
    console.log(data);
    axios
      .post(`${window.location.origin}/api/taxcalculation`, data)
      .then((response) => {
        // Handle success response
        console.log(response.data.id);
        setId(response.data.id);
        // console.log(id);
        setOldTaxDetails(response.data.oldTaxDetails);
        setNewTaxDetails(response.data.newTaxDetails);
        setTaxSavingDetails(response.data.taxSavingDetails);
        setLoading(false);
        const element = document.getElementById("result-box");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };
  const handleCalculateTax = () => {
    sendDataToEndpoint();
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      {currentUser ? (
        <div>
          <div className="row text-center">
            <div className="col">
              <div className="mb-3 ">
                <label htmlFor="name" className="form-label">
                  Enter Your Name:
                </label>
                <input
                  type="text"
                  className="form-control custom-width mx-auto"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>
          </div>
          <div className="container mt-5 form-box">
            <h1 className="mb-4 heading">Salary Details</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="basicSalary" className="form-label">
                  Basic Salary:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="basicSalary"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="da" className="form-label">
                  DA (Dearness Allowance):
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="da"
                  value={da}
                  onChange={(e) => setDa(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hra" className="form-label">
                  HRA (House Rent Allowance):
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="hra"
                  value={hra}
                  onChange={(e) => setHra(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="check-box"
                  type="checkbox"
                  id="otherAllowances"
                  checked={otherAllowances.enabled}
                  onChange={(e) =>
                    setOtherAllowances({
                      value: "",
                      enabled: e.target.checked,
                    })
                  }
                />
                <label htmlFor="otherAllowances" className="form-label">
                  Other Allowances:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={otherAllowances.value}
                  onChange={(e) =>
                    setOtherAllowances({
                      ...otherAllowances,
                      value: e.target.value,
                    })
                  }
                  disabled={!otherAllowances.enabled}
                />
              </div>
            </form>
          </div>
          <div className="container mt-5 form-box">
            <h1 className="mb-4 heading">Income from Other Sources</h1>
            <form>
              <div className="mb-3">
                <input
                  className="check-box"
                  type="checkbox"
                  id="deposits"
                  checked={deposits.enabled}
                  onChange={(e) =>
                    setDeposits({
                      value: "",
                      enabled: e.target.checked,
                    })
                  }
                />
                <label htmlFor="deposits" className="form-label">
                  Interests from Deposits:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={deposits.value}
                  onChange={(e) =>
                    setDeposits({ ...deposits, value: e.target.value })
                  }
                  disabled={!deposits.enabled}
                />
              </div>
              <div className="mb-3">
                <input
                  className="check-box"
                  type="checkbox"
                  id="otherIncome"
                  checked={otherIncome.enabled}
                  onChange={(e) =>
                    setOtherIncome({
                      value: "",
                      enabled: e.target.checked,
                    })
                  }
                />
                <label htmlFor="otherIncome" className="form-label">
                  Other Income:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={otherIncome.value}
                  onChange={(e) =>
                    setOtherIncome({ ...otherIncome, value: e.target.value })
                  }
                  disabled={!otherIncome.enabled}
                />
              </div>
            </form>
          </div>
          <div className="container mt-5 form-box">
            <h1 className="mb-4 heading">Deductions</h1>
            <form>
              <div className="mb-3">
                <input
                  className="check-box"
                  type="checkbox"
                  id="medical"
                  checked={medical.enabled}
                  onChange={(e) =>
                    setMedical({
                      value: "",
                      enabled: e.target.checked,
                    })
                  }
                />
                <label htmlFor="medical" className="form-label">
                  Medical Insurance:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={medical.value}
                  onChange={(e) =>
                    setMedical({ ...medical, value: e.target.value })
                  }
                  disabled={!medical.enabled}
                />
              </div>
              <div className="mb-3">
                <input
                  className="check-box"
                  type="checkbox"
                  id="HomeLoan"
                  checked={HomeLoan.enabled}
                  onChange={(e) =>
                    setHomeLoan({ value: "", enabled: e.target.checked })
                  }
                />
                <label htmlFor="HomeLoan" className="form-label">
                  Interest from Home Loan:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={HomeLoan.value}
                  onChange={(e) =>
                    setHomeLoan({ ...HomeLoan, value: e.target.value })
                  }
                  disabled={!HomeLoan.enabled}
                />
              </div>
              <div className="mb-3">
                <input
                  className="check-box"
                  type="checkbox"
                  id="EducationLoan"
                  checked={EducationLoan.enabled}
                  onChange={(e) =>
                    setEducationLoan({
                      value: "",
                      enabled: e.target.checked,
                    })
                  }
                />
                <label htmlFor="EducationLoan" className="form-label">
                  Interests from Education Loan:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={EducationLoan.value}
                  onChange={(e) =>
                    setEducationLoan({
                      ...EducationLoan,
                      value: e.target.value,
                    })
                  }
                  disabled={!EducationLoan.enabled}
                />
              </div>
              <div className="mb-3">
                <input
                  className="check-box"
                  type="checkbox"
                  id="NPS"
                  checked={NPS.enabled}
                  onChange={(e) =>
                    setNPS({ value: "", enabled: e.target.checked })
                  }
                />
                <label htmlFor="NPS" className="form-label">
                  NPS:
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={NPS.value}
                  onChange={(e) => setNPS({ ...NPS, value: e.target.value })}
                  disabled={!NPS.enabled}
                />
              </div>
            </form>
          </div>
          <div className="button">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCalculateTax}
            >
              Calculate Tax
            </button>
          </div>
          <div id="result-box">
            <div className="result-div">
              {loading ? null : (
                <Result
                  oldTaxDetails={oldTaxDetails}
                  newTaxDetails={newTaxDetails}
                  taxSavingDetails={taxSavingDetails}
                /> // Pass data to child component once received
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
