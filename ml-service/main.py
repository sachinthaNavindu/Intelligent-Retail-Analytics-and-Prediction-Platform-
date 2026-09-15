from pathlib import Path

import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SmartRetail AI API",
    description="Machine Learning and Retail Anlaytics API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "raw" / "online_retail_II.csv"

df = pd.read_csv(DATA_PATH)

df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"])

@app.get("/")
def root():
    return {
        "message": "SmartRetail AI API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "smart-retail-ml-service"
    }

@app.get("/api/dashboard/summary")
def get_dashboard_summary():

    total_sales = (df["Quantity"] * df["Price"]).sum()

    total_orders = df["Invoice"].nunique()

    total_products = df["StockCode"].nunique()

    total_customers = df["Customer ID"].nunique()

    total_countries = df["Country"].nunique()

    return {
        "total_sales": round(float(total_sales), 2),
        "total_orders": int(total_orders),
        "total_products": int(total_products),
        "total_customers": int(total_customers),
        "total_countries": int(total_countries)
    }