import React, { useEffect, useRef } from "react";

function Dashboard() {
    const tableauContainerRef = useRef(null);

    useEffect(() => {
        // Ensure the Tableau library is loaded
        if (!window.tableau) {
            console.error("Tableau JS library not loaded.");
            return;
        }

        const dashVizUrl = "https://public.tableau.com/views/SP500indexDashboard/SP500indexDashboard";
        
        if (tableauContainerRef.current) {
            const viz = new window.tableau.Viz(tableauContainerRef.current, dashVizUrl, {
                height: '2000px',
                width: '100%'
            });

            // Optional: Clean up the Viz instance on component unmount
            return () => {
                viz.dispose();
            };
        }
    }, []); // Ensure this effect runs only once

    return (
        <main id="dashcontainer">
            <div id="graph-container"> {/* Corrected the typo here */}
                <div ref={tableauContainerRef} id="tableau-container"></div> {/* Corrected the typo here */}
            </div>
        </main>
    );
}

export default Dashboard;
