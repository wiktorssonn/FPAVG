import React, { useRef, useState } from 'react';
import StockApi from './StockApi';
import FundamentalsTable from './FundamentalsTable';
import Chart from './Chart';


export default function StockForm() {
    // Listor där data kommer sparas innan det presenteras i graf/tabell
    const [fundamentals, setFundamentals] = useState([]);
    const [graphLabels, setGraphLabels] = useState([]);
    const [graphData, setGraphData] = useState([]);

    // Variabler för att få data från formuläret
    const inputTicker = useRef();
    const selectTicker = useRef();

    return (
        <div className="container col-md-10">
            <h4 className="mt-5">Ange ticker för att få ut data om aktien</h4>
            <label htmlFor="ticker" className="form-label mb-0" >Ticker:</label>
            <input type="text" className="form-control" name="ticker" placeholder="Eg. AAPL" ref={inputTicker}/>
            
            <label htmlFor="inspiration" className="form-label mt-3 mb-0">Ticker inspiration:</label>
            <select className="form-select" ref={selectTicker}>
                <option>Några vanliga tickers</option>
                <option valute="AAPL">AAPL</option>
                <option valute="AMZN">AMZN</option>
                <option valute="BABA">BABA</option>
                <option valute="GOOG">GOOG</option>
                <option valute="MSFT">MSFT</option>
                <option valute="TSLA">TSLA</option>
                <option valute="WMT">WMT</option>

            </select>

            <p className="small">Om du anger en ticker i både textfältet och listan så är det tickern i textfältet som kommer användas.</p>

            <StockApi fundamentals={fundamentals} setFundamentals={setFundamentals} inputTicker={inputTicker} selectTicker={selectTicker} graphData={graphData} graphLabels={graphLabels} setGraphData={setGraphData} setGraphLabels={setGraphLabels} />

            <Chart graphData={graphData} graphLabels={graphLabels} />

            <FundamentalsTable fundamentals={fundamentals} />

        </div>
    )
}
