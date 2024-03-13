import React from "react";

function Docs() {
    return (
        <main id="docs-main">
            <div id="docs-header">
                <h1>"Explore the S&P 500 Sector Analyzer”</h1>
                <p>Welcome to a guide designed to offer <span className="yellowtext">concise</span> and <span className="yellowtext">vital </span>
                information about each company within its respective sector, 
                while also providing  historical performance 
                for each sector. 
                </p>
            </div>
            <div className="docs-section">
                <h1 id="sectorsinclude-header"><span className="yellowtext">11</span> sectors inside include</h1>
                    <div id="griddy">
                        <div><strong>Communication Services:</strong> Provides communication and content services, including telecommunications, media, and entertainment</div>
                        <div><strong>Consumer Discretionary:</strong> Encompasses businesses that offer non-essential goods and services, such as retail, automotive, and leisure</div>
                        <div><strong>Consumer Staples:</strong> Produce and sell essential, everyday products like food, beverages, and household items</div>
                        <div><strong>Energy:</strong> Focused on the exploration, production, and distribution of energy resources, including oil, gas, and renewable energy sources</div>
                        <div><strong>Financials:</strong> Banks, insurance companies, and other financial institutions involved in managing money and providing financial services</div>
                        <div><strong>Health Care:</strong> Encompasses companies involved in healthcare services, pharmaceuticals, biotechnology, and medical equipment</div>
                        <div><strong>Industrials:</strong> Manufacturing, construction, aerospace, defense, and other industrial activities</div>
                        <div><strong>Information Technology:</strong> Businesses in IT provide hardware, software, and services related to computing, data management, and technology innovation</div>
                        <div><strong>Materials:</strong> Companies involved in the extraction, processing, and manufacturing of raw materials and commodities</div>
                        <div><strong>Real Estate:</strong> Encompasses companies engaged in the development, management, and investment in real estate properties</div>
                        <div><strong>Utilities:</strong> Provides essential services like electricity, gas, and water supply, as well as related infrastructure</div>
                    </div>
            </div>
        </main>
    )
}

export default Docs;
