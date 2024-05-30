# S&P 500 Sector Analyzer

## Overview
This prototype is a website that analyzes S&P 500 companies by sector, displaying relevant financial data and visualizations. Website is built with React, Flask, PostgreSQL and Render(hosting).

## Link to website
- www.sp500sectoranalyzer.com

## Features
- Displays tables for each of the 11 sectors in the S&P 500.
- Shows company names, tickers, market cap, current price and weekly information.
- Provides a Tableau bar graph comparing the 6-month percentage difference of the 11 sectors.
- Includes dynamic navigation to switch between sector tables.
- Shows the daily performance and current price of $VOO using data from yfinance.

### Frontend
- **React**: Developed frontend using React to create a dynamic and responsive user interface.
- **Navigation**: Implemented buttons in top-left section of nav bar to switch between main page and documentation page. Top-right section of nav bar displays the daily performance percentage and current price of $VOO.
- **Main Page**: Designed the main page to include a heading section, an integrated section below the heading with a Tableau bar graph displaying the 6-month performance of each sector, and a table below the graph with information about the selected sector. The table features Next and Previous buttons to dynamically load tables for other sectors.
- **Documenation Page**: Provides detailed information about the website and descriptions of each sector

### Backend
- **Flask**: Set up Flask backend with different libraries such as SQLAlchemy and more to serve frontend with data.
- **Database**: Configured a PostgreSQL database hosted on Render to store and retrieve S&P 500 company data.
- **API Endpoints**: Created API endpoints to fetch sector data and VOO performance data using yfinance.

### Deployment
- **Render**: Deployed the web application using Render to ensure it is accessible online.

## Technologies Used
- **Frontend**: React, JavaScript HTML, SASS
- **Backend**: Flask, Python, PostgreSQL
- **Data Visualization**: Tableau
- **Deployment**: Render
- **Data Fetching**: yfinance (for $VOO performance data)

