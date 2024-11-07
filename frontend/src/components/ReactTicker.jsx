import { getCurrencies } from "../services/currency.service";
import { useEffect, useState } from "react";
import { HorizontalTicker } from "react-infinite-ticker";
const ReactTicker = () => {
  const [currencies, setCurrencies] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrencies();
      setCurrencies(data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <HorizontalTicker duration={25000}>
        <div className="ticker-item">GBP/USD {currencies.usd}</div>
        <div className="ticker-item">GBP/EUR {currencies.eur}</div>
        <div className="ticker-item">GBP/JPY {currencies.jpy}</div>
        <div className="ticker-item">GBP/AUD {currencies.aud}</div>
        <div className="ticker-item">GBP/CAD {currencies.cad}</div>
        <div className="ticker-item">GBP/NGN {currencies.ngn}</div>
        <div className="ticker-item">GBP/CHF {currencies.chf}</div>
        <div className="ticker-item">GBP/JOD {currencies.jod}</div>
        <div className="ticker-item">GBP/RUB {currencies.rub}</div>
        <div className="ticker-item">GBP/QAR {currencies.qar}</div>
        <div className="ticker-item">GBP/HKD {currencies.hkd}</div>
        <div className="ticker-item">GBP/SAR {currencies.sar}</div>
        <div className="ticker-item">GBP/CNH {currencies.cnh}</div>
      </HorizontalTicker>
    </div>
  );
};

export default ReactTicker;
