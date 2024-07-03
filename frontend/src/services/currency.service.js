import axios from "axios";

export const getCurrencies = async () => {
  try {
    console.log("getting currencies");
    const res = await axios.get(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/gbp.json"
    );
    if (res.status === 200) {
      const currenciesList = {
        usd: res.data.gbp.usd,
        eur: res.data.gbp.eur,
        jpy: res.data.gbp.jpy,
        aud: res.data.gbp.aud,
        cad: res.data.gbp.cad,
        ngn: res.data.gbp.ngn,
      };
      return currenciesList;
    }
    throw new Error(`Login failed`);
  } catch (e) {
    return e;
  }
};
