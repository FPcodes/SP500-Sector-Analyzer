import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {

    const [vooData, setVooData] = useState({
        firstDayPrice: 'Loading...',
        currentPrice: 'Loading...',
        priceDifference: 'Loading...',
        lastUpdated: 'Loading...'
      });

      useEffect(() => {
        async function fetchVooData() {
          try {
            const response = await fetch('/voo/api'); // Make sure this endpoint matches your Flask API
            const data = await response.json();
            setVooData({
              firstDayPrice: `Feb 1st, 2024: ${data.first_day_close}`,
              currentPrice: `Today: ${data.current_day_close}`,
              priceDifference: `Price Difference: +$${data.price_difference}`,
            });
          } catch (error) {
            console.error('Error fetching VOO data:', error);
          }
        }
    
        fetchVooData();
      }, []);

    return (
        <div>
            <nav>
                <ul className="navbar-left">
                    <li><Link to="/sectors"><i className="fa-solid fa-house"></i></Link></li>
                    <li><Link to="/docs"><i class="fa-solid fa-book"></i></Link></li>
                </ul>
                <ul className="navbar-right">
                    <span>{vooData.firstDayPrice}</span>
                    <span>{vooData.currentPrice}</span>
                    <span>{vooData.priceDifference}</span>
                    <span>{vooData.lastUpdated}</span>
                </ul>        
            </nav>
            {children}
            <footer>
                
            </footer>
        </div>
    )
}

export default Layout;