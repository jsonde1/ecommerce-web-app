import { getCurrencies } from "../services/currency.service";
import { useEffect, useState } from "react";
import { HorizontalTicker } from "react-infinite-ticker";
const ReactTicker = () => {
  const [currencies, setCurrencies] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrencies();
      setCurrencies(data);
    };
    fetchData();
  }, []);
  return (
    <div style={{ position: "relative" }}>
      {/* Fade effect at edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "50px",
          background:
            "linear-gradient(to right, rgba(30, 41, 59, 0.95), transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "50px",
          background:
            "linear-gradient(to left, rgba(30, 41, 59, 0.95), transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <HorizontalTicker duration={25000}>
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
          GBP/CHF{" "}
          <strong>
            {currencies.chf ? parseFloat(currencies.chf).toFixed(3) : "---"}
          </strong>
        </div>
        <div className="ticker-item">
          GBP/JOD{" "}
          <strong>
            {currencies.jod ? parseFloat(currencies.jod).toFixed(3) : "---"}
          </strong>
        </div>
        <div className="ticker-item">
          GBP/RUB{" "}
          <strong>
            {currencies.rub ? parseFloat(currencies.rub).toFixed(3) : "---"}
          </strong>
        </div>
        <div className="ticker-item">
          GBP/QAR{" "}
          <strong>
            {currencies.qar ? parseFloat(currencies.qar).toFixed(3) : "---"}
          </strong>
        </div>
        <div className="ticker-item">
          GBP/HKD{" "}
          <strong>
            {currencies.hkd ? parseFloat(currencies.hkd).toFixed(3) : "---"}
          </strong>
        </div>
        <div className="ticker-item">
          GBP/SAR{" "}
          <strong>
            {currencies.sar ? parseFloat(currencies.sar).toFixed(3) : "---"}
          </strong>
        </div>
        <div className="ticker-item">
          GBP/CNH{" "}
          <strong>
            {currencies.cnh ? parseFloat(currencies.cnh).toFixed(3) : "---"}
          </strong>
        </div>
      </HorizontalTicker>
    </div>
  );
};

export default ReactTicker;
