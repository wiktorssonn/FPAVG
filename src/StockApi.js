import React from 'react';
import axios from 'axios';

// Api-nyckeln
const apikey = "13WF8DG2WGLAYUSC"

export default function StockApi(props) {

    // Funktionen som körs när man klickar på "sök" i formuläret
    function getStockData() {
        // Tömmer listorna när ny sökning görs
        props.fundamentals.length = 0;
        props.graphLabels.length = 0;
        props.graphData.length = 0;

        // Variabler för input från formuläret
        const input = props.inputTicker.current.value;
        const select = props.selectTicker.current.value;

        // Kontrollerar att något av fälten fyllts i
        if (input.length > 2 || select !== "Några vanliga tickers") {
            // Om både input och select är ifyllda, ta värdet från input
            if (input.length > 2 && select !== "Några vanliga tickers") {                   
                apiCall(input);
                
            } else if (input.length > 2) { // Om bara input är ifyllt
                apiCall(input);
                                
            } else { // Om bara select är ifyllt
                apiCall(select);     
            }

        } else {
            alert("En ticker måste vara minst 3 tecken lång!");
        }

        // Återställer formuläret till standardvärden
        props.inputTicker.current.value = "";
        props.selectTicker.current.value = "Några vanliga tickers";
    }

    function apiCall(symbol) {
        // Hämtar data till grafen 
        axios.get('https://www.alphavantage.co/query?', {
                params: {
                function: "TIME_SERIES_DAILY",
                symbol: symbol,
                apikey: apikey
                }
                })
                .then(function (response) {
                    // Kontrollerar om max antal förfrågningar uppnåtts
                    if (response.data["Note"] === undefined) {
                        // Kontrollerar om angiven ticker hittades
                        if (response.data["Time Series (Daily)"] !== undefined) {
                            const timeData = response.data["Time Series (Daily)"];

                            // Ger oss en lista med alla datum
                            const date = Object.keys(response.data["Time Series (Daily)"]);

                            // Lägger till alla datum i graphLabels
                            date.forEach(item => props.graphLabels.push(item));

                            // Lägger till stängningsdata för aktien i graphData
                            for (var key in timeData) {
                                props.graphData.push(timeData[key]["4. close"]);
                            }

                        // Vänder på listorna så det visas rätt i grafen
                        props.graphLabels.reverse();
                        props.graphData.reverse();

                        // Sätter nytt state efter att listorna uppdaterats
                        props.setGraphLabels([...props.graphLabels]);
                        props.setGraphData([...props.graphData])

                        } else {
                            alert("Angiven ticker kunde inte hittas, försök igen!");
                        }
                    } else {
                        alert("Max antal förfrågningar, försök igen om några sekunder");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        
        // Hämtar data till fundamentals-tabellen
        axios.get('https://www.alphavantage.co/query?', {
                params: {
                function: "OVERVIEW",
                symbol: symbol,
                apikey: apikey
                }
                })
                .then(function (response) {
                    props.setFundamentals([...props.fundamentals, {
                        name: "Företag",
                        key: response.data["Name"]
                    },  
                    {
                        name: "P/E",
                        key: response.data["PERatio"]
                    },
                    {
                        name: "EPS",
                        key: response.data["EPS"]
                    },
                    {
                        name: "Bookvalue",
                        key: response.data["BookValue"]
                    },   
                    {
                        name: "Utdelning",
                        key: response.data["DividendPerShare"]
                    },
                    {
                        name: "Utdelningsdag",
                        key: response.data["DividendDate"]
                    }]); 
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });      
    }

    return (
        <div>
            <button className="btn btn-success mt-1" onClick={getStockData}>Sök</button>
        </div>
    )
}
