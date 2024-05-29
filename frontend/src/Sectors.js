import React, { useState, useEffect, useMemo, useRef} from 'react';

function Sectors() {
    const [data, setData] = useState([]); // Store the fetched data
    const [currentSectorIndex, setCurrentSectorIndex] = useState(0); // Current displayed sector index
    const [currentView, setCurrentView] = useState('table'); // Current view: 'graph', 'table', or 'map'
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const sixMonthContainerRef = useRef(null); // Ref for the six-month graph
    const sixMonthVizRef = useRef(null); // This will hold the six-month graph Tableau visualization

    useEffect(() => {
        const fetchSectorData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/sectors`);
                const jsonData = await response.json();
                setData(jsonData); // Assuming jsonData is an array of sectors with companies
            } catch (error) {
                console.error('Error fetching sector data:', error);
            }
        };

        fetchSectorData(); 
    }, []);

    const handleNext = () => {
        setCurrentSectorIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrevious = () => {
        setCurrentSectorIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const changeView = (view) => {
        setCurrentView(view);
    };

    const currentSector = data[currentSectorIndex] || { companies: [], sector: "" };

    // Below Code for sorting table //

const convertMarketCapToNumber = (marketCap) => {
    const value = parseFloat(marketCap);
    if (marketCap.includes('B')) {
        return value * 1e9; // Convert billions to number
    } else if (marketCap.includes('T')) {
        return value * 1e12; // Convert trillions to number
    }
    return value; // Return the number as is if no B or T is found
};

// Adjusted requestSort function to use the helper function for market cap
const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    setSortConfig({ key, direction });
};

const sortedCompanies = useMemo(() => {
    let sortableItems = [...currentSector.companies]; // Copy current sector companies
    if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Use the helper function for market cap sorting
            if (sortConfig.key === 'market_cap') {
                aValue = convertMarketCapToNumber(a[sortConfig.key]);
                bValue = convertMarketCapToNumber(b[sortConfig.key]);
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }
    return sortableItems;
}, [currentSector.companies, sortConfig]);


    // Tableau Code below
    // Initialize the six-month graph
    useEffect(() => {
        const sixMonthVizUrl = "https://public.tableau.com/views/SP500SixMonthsVolumeBarCharts/SixMonthsPercentageDifference";
        if (sixMonthVizRef.current === null && sixMonthContainerRef.current) {
            sixMonthVizRef.current = new window.tableau.Viz(sixMonthContainerRef.current, sixMonthVizUrl, { height: '300px', width: '100%' }, { hideTabs: true });
        }
    }, []); // Empty dependency array to run only once on mount

      
    return (
        <main>
            <div className="heading">
                <p className="heading-top">S&P 500 <br/> Sector Analyzer</p>
                <p className="heading-bottom">Analyze all 11 sections, updated daily</p>
            </div>
            <div id="sixmonthchart" ref={sixMonthContainerRef}></div>
            {data.length > 0 && (
                <div id="sectormain">
                <>
                  <div id="button-container">
                    <div className="button-items">
                        <button className="btn" onClick={handlePrevious}>Prev</button>
                        <button className="btn" onClick={handleNext}>Next</button>
                    </div>
                    <h2 className="sector-heading">{currentSector.sector}</h2>
                    <div id="buttonitems-right" className="button-items">
                        <button className="btn" onClick={() => changeView('table')}>Table</button>
                    </div>
                  </div>
                    {currentView === 'table' && (
                        <>
                        <h2 className="section-heading">Information Table for {currentSector.sector}</h2>
                        <div id="table-container">
                        <table>
                            <thead>
                                <tr>
                                     <th onClick={() => requestSort('ticker')}>
                                         Ticker {sortConfig.key === 'ticker' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                    </th>
                                    <th onClick={() => requestSort('company')}>
                                        Company {sortConfig.key === 'company' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                    </th>
                                    <th onClick={() => requestSort('market_cap')}>
                                        Market Cap {sortConfig.key === 'market_cap' && (sortConfig.direction === 'ascending' ? '↑' : '↑')}
                                    </th>
                                    <th onClick={() => requestSort('date')}>
                                        Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                    </th>
                                    <th onClick={() => requestSort('weekly_open')}>
                                        Weekly Open {sortConfig.key === 'weekly_open' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                    </th>
                                    <th onClick={() => requestSort('weekly_close')}>
                                        Weekly Close {sortConfig.key === 'weekly_close' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                     </th>
                                    <th onClick={() => requestSort('weekly_percentage')}>
                                        Weekly Percentage {sortConfig.key === 'weekly_percentage' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                    </th>
                                    <th onClick={() => requestSort('weekly_volume')}>
                                    Weekly Volume {sortConfig.key === 'weekly_volume' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedCompanies.map((company) => (
                                    <tr key={company.id}>
                                        <td>{company.ticker}</td>
                                        <td>{company.company}</td>
                                        <td>{company.market_cap}</td>
                                        <td>{new Date(company.date).toLocaleDateString()}</td>
                                        <td>{company.weekly_open.toLocaleString()}</td>
                                        <td>{company.weekly_close.toLocaleString()}</td>
                                        <td>{company.weekly_percentage}</td>
                                        <td>{company.weekly_volume.toLocaleString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                        </>
                    )}
                </>
                </div>
            )}
        </main>
    );
}

export default Sectors;