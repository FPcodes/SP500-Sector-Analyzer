from flask import Blueprint, jsonify, make_response
import yfinance as yf
import json
from datetime import datetime, timedelta
from . import db
from .models import SP500_Realtime_Data

main = Blueprint('main', __name__)

@main.route('/api/sectors', methods=['GET'])
def sectors():

    sectors = []
    sector_names = ["Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Financials", "Health Care", "Industrials", "Information Technology", "Materials", "Real Estate", "Utilities"]

    for sector in sector_names:
        companies = SP500_Realtime_Data.query.filter_by(sector=sector).all()
        sector_data = {"sector": sector, "companies": [company.serialize() for company in companies]}
        sectors.append(sector_data)
        
    return jsonify(sectors)


@main.route('/voo/api', methods=['GET'])
def voo_price():
    voo = yf.Ticker("VOO")
    hist = voo.history(period="2d")  # Fetching data for the last two days

    # Get the latest and previous closing prices
    latest_close = hist['Close'].iloc[-1]
    previous_close = hist['Close'].iloc[-2]

    # Calculate price difference
    price_difference = latest_close - previous_close

    # Format the response data
    response_data = {
        "vooprice": f"{latest_close:.2f}",
        "lastupdated": hist.index[-1].strftime("%Y-%m-%d"),
        "priceDifference": f"{price_difference:.2f}" if price_difference >= 0 else f"-{abs(price_difference):.2f}"
    }

    return jsonify(response_data)

    
