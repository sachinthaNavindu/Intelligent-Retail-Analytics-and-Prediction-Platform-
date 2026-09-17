import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    date: "",
    lag_1: "",
    lag_7: "",
    lag_14: "",
    lag_28: "",
    rolling_mean_7: "",
    rolling_mean_14: "",
    rolling_mean_28: "",
    rolling_std_7: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [predictionDate, setPredictionDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setPrediction(null);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          date: formData.date,
          lag_1: Number(formData.lag_1),
          lag_7: Number(formData.lag_7),
          lag_14: Number(formData.lag_14),
          lag_28: Number(formData.lag_28),
          rolling_mean_7: Number(formData.rolling_mean_7),
          rolling_mean_14: Number(formData.rolling_mean_14),
          rolling_mean_28: Number(formData.rolling_mean_28),
          rolling_std_7: Number(formData.rolling_std_7),
        }
      );

      setPrediction(response.data.predicted_revenue);
      setPredictionDate(formData.date);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to generate the prediction. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

const formatDate = (date) => {
  if (!date) return "";

  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-LK",
    {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }
  );

  return formattedDate;
};

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <h1>SmartRetail</h1>
            <p>Retail Sales Prediction Platform</p>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="page-title">
          <span className="page-label">SALES FORECAST</span>
          <h2>Daily Revenue Prediction</h2>
          <p>
            Predict the expected revenue for a selected date using historical
            sales patterns and machine learning.
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="section">
              <div className="section-header">
                <div className="section-number">1</div>

                <div>
                  <h3>Select Prediction Date</h3>
                  <p>
                    Choose the date for which you want to predict daily revenue.
                  </p>
                </div>
              </div>

              <div className="date-field">
                <label htmlFor="date">Prediction Date</label>

                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

                <small>
                  The model will estimate the revenue expected on this date.
                </small>
              </div>
            </div>

            <div className="divider"></div>

            {/* Historical Features */}
            <div className="section">
              <div className="section-header">
                <div className="section-number">2</div>

                <div>
                  <h3>Historical Sales Information</h3>
                  <p>
                    Provide previous sales values used by the prediction model.
                  </p>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Previous Day Revenue</label>
                  <span className="field-description">
                    Revenue from 1 day before
                  </span>
                  <input
                    type="number"
                    name="lag_1"
                    value={formData.lag_1}
                    onChange={handleChange}
                    placeholder="15000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Revenue 7 Days Ago</label>
                  <span className="field-description">
                    Revenue from 7 days before
                  </span>
                  <input
                    type="number"
                    name="lag_7"
                    value={formData.lag_7}
                    onChange={handleChange}
                    placeholder="18000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Revenue 14 Days Ago</label>
                  <span className="field-description">
                    Revenue from 14 days before
                  </span>
                  <input
                    type="number"
                    name="lag_14"
                    value={formData.lag_14}
                    onChange={handleChange}
                    placeholder="17500"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Revenue 28 Days Ago</label>
                  <span className="field-description">
                    Revenue from 28 days before
                  </span>
                  <input
                    type="number"
                    name="lag_28"
                    value={formData.lag_28}
                    onChange={handleChange}
                    placeholder="16000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>7-Day Average Revenue</label>
                  <span className="field-description">
                    Average revenue over the last 7 days
                  </span>
                  <input
                    type="number"
                    name="rolling_mean_7"
                    value={formData.rolling_mean_7}
                    onChange={handleChange}
                    placeholder="17000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>14-Day Average Revenue</label>
                  <span className="field-description">
                    Average revenue over the last 14 days
                  </span>
                  <input
                    type="number"
                    name="rolling_mean_14"
                    value={formData.rolling_mean_14}
                    onChange={handleChange}
                    placeholder="16500"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>28-Day Average Revenue</label>
                  <span className="field-description">
                    Average revenue over the last 28 days
                  </span>
                  <input
                    type="number"
                    name="rolling_mean_28"
                    value={formData.rolling_mean_28}
                    onChange={handleChange}
                    placeholder="16000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>7-Day Revenue Variation</label>
                  <span className="field-description">
                    Standard deviation of the last 7 days
                  </span>
                  <input
                    type="number"
                    name="rolling_std_7"
                    value={formData.rolling_std_7}
                    onChange={handleChange}
                    placeholder="2500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="predict-button"
              disabled={loading}
            >
              {loading ? "Generating Prediction..." : "Predict Daily Revenue"}
            </button>
          </form>

          {error && (
            <div className="error">
              <strong>Prediction Error</strong>
              <p>{error}</p>
            </div>
          )}

          {prediction !== null && (
            <div className="result">
              <div className="result-icon">✓</div>

              <p className="result-label">REVENUE FORECAST</p>

              <h3>Expected Revenue for</h3>

              <h4>{formatDate(predictionDate)}</h4>

              <div className="prediction-value">
                Rs.{" "}
                {prediction.toLocaleString("en-LK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>

              <p className="result-description">
                This is the machine learning model's estimated total revenue
                for <strong>{formatDate(predictionDate)}</strong>.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

