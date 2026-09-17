# SmartRetail

### Intelligent Retail Analytics and Sales Prediction Platform

SmartRetail is a machine learning-based retail analytics platform designed to analyze historical retail transaction data and predict daily revenue.

The project follows an end-to-end machine learning workflow, including data understanding, data cleaning, exploratory data analysis, feature engineering, model training, evaluation, and deployment through a REST API and web application.

---

## Overview

Retail businesses generate large volumes of transaction data that can be used to understand sales patterns and support future planning.

SmartRetail uses historical retail transaction data to:

* Analyze retail sales performance
* Identify sales patterns and trends
* Prepare and clean transaction data
* Engineer time-series and historical sales features
* Train and compare machine learning regression models
* Predict expected daily revenue
* Expose the trained model through a REST API
* Provide a web-based interface for making predictions

The system demonstrates the complete machine learning lifecycle from raw transaction data to a deployed prediction application.

---

## Key Features

### Data Analysis

* Raw retail transaction analysis
* Missing-value analysis
* Duplicate detection
* Data type validation
* Transaction quality analysis
* Cancellation and invalid transaction identification

### Data Cleaning

* Date conversion and validation
* Removal of invalid sales transactions
* Handling of cancelled invoices
* Validation of quantity and price values
* Creation of cleaned transaction datasets

### Exploratory Data Analysis

* Daily revenue analysis
* Monthly revenue trends
* Sales quantity analysis
* Order and customer analysis
* Product-level analysis
* Country-level analysis
* Visualization of historical sales patterns

### Feature Engineering

The prediction model uses a combination of calendar-based and historical sales features:

* Year
* Month
* Day of Week
* Day of Month
* Weekend indicator
* Cyclical month features
* Cyclical day-of-week features
* 1-day revenue lag
* 7-day revenue lag
* 14-day revenue lag
* 28-day revenue lag
* 7-day rolling mean
* 14-day rolling mean
* 28-day rolling mean
* 7-day rolling standard deviation

These features combine calendar information with historical sales behavior to support daily revenue prediction.

### Machine Learning

The project compares regression models including:

* Linear Regression
* Random Forest Regressor

The models are evaluated using:

* Mean Absolute Error (MAE)
* Root Mean Squared Error (RMSE)
* R² Score

A chronological train-validation-test split is used to preserve the time-series nature of the sales data.

### Prediction API

The trained model is exposed through a FastAPI REST API.

The API accepts a prediction date and historical sales information and returns the estimated daily revenue.

### Web Application

A React and Vite frontend provides an interface where users can:

1. Select a prediction date
2. Enter historical sales information
3. Submit a prediction request
4. View the predicted daily revenue

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                         HTTP REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   FastAPI Backend   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Trained ML Model   │
                    │  Regression Model   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Predicted Revenue   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │   Prediction Result │
                    └─────────────────────┘
```

---

## Dataset

The project uses the **Online Retail II** dataset containing historical retail transactions.

The original dataset contains:

* **1,067,371 transactions**
* **8 attributes**
* Transaction information covering approximately two years

### Original Features

| Feature       | Description                    |
| ------------- | ------------------------------ |
| `Invoice`     | Invoice identification number  |
| `StockCode`   | Product identification code    |
| `Description` | Product description            |
| `Quantity`    | Number of items purchased      |
| `InvoiceDate` | Transaction date and time      |
| `Price`       | Unit price                     |
| `Customer ID` | Customer identification number |
| `Country`     | Customer country               |

The dataset contains several data-quality issues, including missing customer information, duplicate records, cancelled invoices, invalid quantities, and invalid prices. These issues are identified and addressed during the data preparation stage.

---

## Machine Learning Workflow

```text
Raw Dataset
     │
     ▼
Data Understanding
     │
     ▼
Data Cleaning
     │
     ▼
Exploratory Data Analysis
     │
     ▼
Feature Engineering
     │
     ▼
Train / Validation / Test Split
     │
     ▼
Model Training
     │
     ▼
Model Evaluation
     │
     ▼
Model Selection
     │
     ▼
Model Serialization
     │
     ▼
FastAPI Prediction Service
     │
     ▼
React Web Application
```

---

## Project Structure

```text
Intelligent-Retail-Analytics-and-Prediction-Platform/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── sales_prediction_model.pkl
│
├── data/
│   ├── models/
│   │   ├── sales_prediction_model.pkl
│   │   └── sales_prediction_features.pkl
│   │
│   ├── processed/
│   │   ├── clean_transactions.csv
│   │   ├── valid_sales.csv
│   │   ├── daily_sales.csv
│   │   ├── forecast_dataset.csv
│   │   └── data_quality_summary.csv
│   │
│   └── raw/
│       └── online_retail_II.csv
│
├── frontend/
│   └── frontend/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
├── notebooks/
│   ├── 01_data_understanding.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_EDA.ipynb
│   ├── 04_feature_engineering.ipynb
│   └── 05_sales_prediction.ipynb
│
├── .gitignore
├── pyproject.toml
├── README.md
└── requirements.txt
```

---

## Model Evaluation

The models are evaluated using a chronological split rather than a random split because the prediction problem is based on historical sales data.

### Evaluation Metrics

**MAE — Mean Absolute Error**

Measures the average absolute difference between actual and predicted revenue.

**RMSE — Root Mean Squared Error**

Measures prediction error while giving greater weight to larger errors.

**R² — Coefficient of Determination**

Measures how much of the variation in revenue is explained by the model.

### Linear Regression Results

| Dataset    |       MAE |      RMSE |     R² |
| ---------- | --------: | --------: | -----: |
| Validation |  9,124.07 | 11,554.16 | 0.5230 |
| Test       | 13,366.80 | 21,373.88 | 0.4771 |

The final model is selected based on validation performance and then evaluated on the test dataset.

---

## Backend API

The backend is implemented using **FastAPI**.

### Start the Backend

```bash
cd backend
python -m uvicorn main:app --reload
```

The local API will be available at:

```text
https://frontend-black-kappa-47.vercel.app/
```

## Frontend

The frontend is built using:

* React
* Vite
* Axios
* CSS

### Run the Frontend

```bash
cd frontend/frontend
npm install
npm run dev
```

The development application will normally be available at:

```text
http://localhost:5173
```

The frontend communicates with the FastAPI backend through the `/predict` REST endpoint.

---

## Technologies Used

### Data Science & Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Matplotlib
* Jupyter Notebook
* Joblib

### Backend

* FastAPI
* Uvicorn
* Pydantic
* Python

### Frontend

* React
* Vite
* Axios
* CSS

### Development & Deployment

* Git
* GitHub
* Vercel

---

## Notebooks

The machine learning workflow is organized into separate notebooks.

### `01_data_understanding.ipynb`

Covers:

* Dataset dimensions
* Data types
* Missing values
* Duplicate records
* Unique values
* Data quality issues

### `02_data_cleaning.ipynb`

Performs:

* Data type conversion
* Transaction validation
* Cancellation handling
* Invalid quantity and price filtering
* Creation of processed datasets

### `03_EDA.ipynb`

Explores:

* Revenue trends
* Sales patterns
* Monthly performance
* Product-level performance
* Country-level performance
* Customer activity

### `04_feature_engineering.ipynb`

Creates:

* Calendar features
* Cyclical features
* Lag features
* Rolling statistics

### `05_sales_prediction.ipynb`

Performs:

* Dataset preparation
* Train/validation/test splitting
* Model training
* Model comparison
* Model evaluation
* Final model selection
* Model serialization

---

## Deployment

The application uses a separated frontend and backend architecture.

```text
                    ┌──────────────────┐
                    │  React Frontend  │
                    │      Vercel      │
                    └────────┬─────────┘
                             │
                          HTTPS
                             │
                             ▼
                    ┌──────────────────┐
                    │  FastAPI Backend │
                    │      Vercel      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Trained Model   │
                    └──────────────────┘
```

The frontend sends prediction requests to the deployed FastAPI backend and displays the returned revenue prediction.

---

## Future Improvements

* Automatically generate lag and rolling features from historical data
* Add additional forecasting models
* Add interactive sales analytics dashboards
* Add prediction history
* Add confidence intervals
* Add automated model retraining
* Add database integration
* Improve model monitoring
* Add automated deployment pipelines

---

## Academic Purpose

SmartRetail was developed as a machine learning project to demonstrate the complete process of developing and integrating a machine learning solution into a full-stack application.

The project covers:

* Data understanding
* Data preprocessing
* Exploratory data analysis
* Feature engineering
* Machine learning
* Model evaluation
* REST API development
* Frontend integration
* Deployment

---

## Authors

**Sachintha Navindu Fernando**
[GitHub](https://github.com/sachinthaNavindu)

**Dulini Prabhashini**
[GitHub](https://github.com/DuliniPrabhashini)

---
