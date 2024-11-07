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
            <div className="ticker-item">GBP/USD {currencies.usd}</div>
            <div className="ticker-item">GBP/EUR {currencies.eur}</div>
            <div className="ticker-item">GBP/JPY {currencies.jpy}</div>
            <div className="ticker-item">GBP/AUD {currencies.aud}</div>
            <div className="ticker-item">GBP/CAD {currencies.cad}</div>
            <div className="ticker-item">GBP/NGN {currencies.ngn}</div>
            <div className="ticker-item">GBP/USD {currencies.usd}</div>
            <div className="ticker-item">GBP/EUR {currencies.eur}</div>
            <div className="ticker-item">GBP/JPY {currencies.jpy}</div>
            <div className="ticker-item">GBP/AUD {currencies.aud}</div>
            <div className="ticker-item">GBP/CAD {currencies.cad}</div>
            <div className="ticker-item">GBP/NGN {currencies.ngn}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticker;
