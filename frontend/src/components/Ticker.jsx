import "../ticker.css";
import { getCurrencies } from "../services/currency.service";
import { useEffect, useState } from "react";
const Ticker = () => {
  const [currencies, setCurrencies] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrencies();
      setCurrencies(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="ticker-container">
        <div className="ticker-wrapper">
          <div className="ticker-transition">
            <div className="ticker-item">
              GBP/USD{" "}
              <strong>
                {currencies.usd ? parseFloat(currencies.usd).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/EUR{" "}
              <strong>
                {currencies.eur ? parseFloat(currencies.eur).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/JPY{" "}
              <strong>
                {currencies.jpy ? parseFloat(currencies.jpy).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/AUD{" "}
              <strong>
                {currencies.aud ? parseFloat(currencies.aud).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/CAD{" "}
              <strong>
                {currencies.cad ? parseFloat(currencies.cad).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/NGN{" "}
              <strong>
                {currencies.ngn ? parseFloat(currencies.ngn).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/USD{" "}
              <strong>
                {currencies.usd ? parseFloat(currencies.usd).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/EUR{" "}
              <strong>
                {currencies.eur ? parseFloat(currencies.eur).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/JPY{" "}
              <strong>
                {currencies.jpy ? parseFloat(currencies.jpy).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/AUD{" "}
              <strong>
                {currencies.aud ? parseFloat(currencies.aud).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/CAD{" "}
              <strong>
                {currencies.cad ? parseFloat(currencies.cad).toFixed(3) : "---"}
              </strong>
            </div>
            <div className="ticker-item">
              GBP/NGN{" "}
              <strong>
                {currencies.ngn ? parseFloat(currencies.ngn).toFixed(3) : "---"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticker;
