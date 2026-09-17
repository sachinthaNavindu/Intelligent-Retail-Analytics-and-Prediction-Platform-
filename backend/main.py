from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="SmartRetail - Sales Prediction API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://frontend-black-kappa-47.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
MODEL_PATH = "../data/models/sales_prediction_model.pkl"

model = joblib.load(MODEL_PATH)


class SalesPredictionRequest(BaseModel):
    date: str
    lag_1: float
    lag_7: float
    lag_14: float
    lag_28: float
    rolling_mean_7: float
    rolling_mean_14: float
    rolling_mean_28: float
    rolling_std_7: float


@app.get("/")
def home():
    return {
        "message": "SmartRetail AI Sales Prediction API"
    }


@app.post("/predict")
def predict_sales(request: SalesPredictionRequest):

    date = pd.to_datetime(request.date)

    year = date.year
    month = date.month
    day_of_week = date.dayofweek
    day_of_month = date.day
    is_weekend = 1 if day_of_week >= 5 else 0

    month_sin = np.sin(2 * np.pi * month / 12)
    month_cos = np.cos(2 * np.pi * month / 12)

    day_of_week_sin = np.sin(2 * np.pi * day_of_week / 7)
    day_of_week_cos = np.cos(2 * np.pi * day_of_week / 7)

    input_data = pd.DataFrame([{
        "Year": year,
        "Month": month,
        "DayOfWeek": day_of_week,
        "DayOfMonth": day_of_month,
        "IsWeekend": is_weekend,
        "MonthSin": month_sin,
        "MonthCos": month_cos,
        "DayOfWeekSin": day_of_week_sin,
        "DayOfWeekCos": day_of_week_cos,
        "Lag_1": request.lag_1,
        "Lag_7": request.lag_7,
        "Lag_14": request.lag_14,
        "Lag_28": request.lag_28,
        "RollingMean_7": request.rolling_mean_7,
        "RollingMean_14": request.rolling_mean_14,
        "RollingMean_28": request.rolling_mean_28,
        "RollingStd_7": request.rolling_std_7
    }])

    prediction = model.predict(input_data)[0]

    return {
        "predicted_revenue": round(float(prediction), 2)
    }