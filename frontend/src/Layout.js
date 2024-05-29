import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [vooData, setVooData] = useState({
      VOOPrice: 'Loading...',
      LastUpdated: 'Loading...',
      priceDifference: 'Loading...',
  });

  useEffect(() => {
      async function fetchVooData() {
          try {
              const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/voo/api`);
              const data = await response.json();
              setVooData({
                  VOOPrice: `VOO: $${data.vooprice}`,
                  LastUpdated: `Updated: ${data.lastupdated}`,
                  priceDifference: `Daily Price Difference: ${data.priceDifference}`,
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
                  <li><Link to="/docs"><i className="fa-solid fa-book"></i></Link></li>
              </ul>
              <ul className="navbar-right">
                <div id="navbarprice">
                  <span>{vooData.VOOPrice}</span> <span>{vooData.LastUpdated}</span>
                </div>
                  <span>{vooData.priceDifference}</span>
              </ul>        
          </nav>
          {children}
          <footer>
              
          </footer>
      </div>
  );
}

export default Layout;