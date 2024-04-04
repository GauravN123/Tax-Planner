import "./css/Result.css";

export default function Result({
  oldTaxDetails,
  newTaxDetails,
  taxSavingDetails,
}) {
  return (
    <div className="result-container">
      {/* {taxDetails.oldTaxDetails.sd} */}
      <div className="container mt-5 form-box">
        <h1 className="mb-4 heading">Tax Results:</h1>
        <div className="tax-container">
          <div className="old-tax">
            <h2 className="new-tax-heading">
              <b>Old Tax Slab</b>
            </h2>
            <div className="tax-details">
              <h2>
                <b>Deductions:</b> Rs.{" "}
                {(oldTaxDetails.sd + oldTaxDetails.formDeductions).toFixed(2)}
              </h2>
              <h2>
                <b>Total Taxable Income:</b> Rs.{" "}
                {oldTaxDetails.taxableIncome.toFixed(2)}
              </h2>
              <h2>
                <b>Total Tax Payable:</b> Rs.{" "}
                {oldTaxDetails.totalTax.toFixed(2)}
              </h2>
            </div>
          </div>
          <div className="new-tax">
            <h2 className="new-tax-heading">
              <b>New Tax Slab</b>
            </h2>
            <div className="tax-details">
              <h2>
                <b>Deductions:</b> Rs.{" "}
                {(newTaxDetails.sd + newTaxDetails.formDeductions).toFixed(2)}
              </h2>
              <h2>
                <b>Total Taxable Income:</b> Rs.{" "}
                {newTaxDetails.taxableIncome.toFixed(2)}
              </h2>
              <h2>
                <b>Total Tax Payable:</b> Rs.{" "}
                {newTaxDetails.totalTax.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
        <h1 className="mb-4 heading"> </h1>
        <div className="tax-container">
          <div className="tax-saving">
            <h2 className="tax-saving-heading">
              <b>
                <u>Recommended Tax Saving Techniques:-</u>
              </b>
            </h2>

            <ul>
              {taxSavingDetails.map((saving, index) => (
                <li key={index}>
                  <b>
                    {index + 1}. {saving}
                  </b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
