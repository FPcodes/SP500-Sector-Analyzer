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
    # Create a Ticker object for VOO
    voo = yf.Ticker("VOO")

    # Calculate the first day of the current month and format today's date
    today = datetime.today()
    first_day_of_month = today.replace(day=1)
    first_day_of_month_str = first_day_of_month.strftime('%Y-%m-%d')
    today_str = today.strftime('%Y-%m-%d')

    # Fetch historical data
    voofirst = voo.history(start=first_day_of_month_str, end=(first_day_of_month + timedelta(days=1)).strftime('%Y-%m-%d'))
    voosecond = voo.history(start=today_str, end=(today + timedelta(days=1)).strftime('%Y-%m-%d'))

    # Initialize response data
    response_data = {
        "first_day_close": None,
        "current_day_close": None,
        "price_difference": None
    }

    # Check if data is available and calculate the difference
    if not voofirst.empty and not voosecond.empty:
        response_data["first_day_close"] = voofirst['Close'].iloc[0].round(2)
        response_data["current_day_close"] = voosecond['Close'].iloc[0].round(2)
        response_data["price_difference"] = round(response_data["current_day_close"] - response_data["first_day_close"], 2)

    return jsonify(response_data)

    
