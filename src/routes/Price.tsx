interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price ({infoData, tickersData}: {infoData?: InfoData, tickersData?: PriceData}) {
  console.log(infoData, tickersData)
  return (
    <div>
      <div>ATH DATE: ${tickersData?.quotes.USD.ath_date}</div>
      <div>ATH PRICE: ${tickersData?.quotes.USD.ath_price}</div>
      <div>MARKET CAP: ${tickersData?.quotes.USD.market_cap}</div>
      <div>MARKET CAP CHANGE 24H: ${tickersData?.quotes.USD.market_cap_change_24h}</div>
      <div>MARKET CAP CHANGE 24H: ${tickersData?.quotes.USD.market_cap_change_24h}</div>
      <div>PERCENT CHANGE 15M: ${tickersData?.quotes.USD.percent_change_15m}</div>
      <div>PERCENT CHANGE 30M: ${tickersData?.quotes.USD.percent_change_30m}</div>
      <div>PERCENT CHANGE 1H: ${tickersData?.quotes.USD.percent_change_1h}</div>
      <div>PERCENT CHANGE 6H: ${tickersData?.quotes.USD.percent_change_6h}</div>
      <div>PERCENT CHANGE 12H: ${tickersData?.quotes.USD.percent_change_12h}</div>
      <div>PERCENT CHANGE 24H: ${tickersData?.quotes.USD.percent_change_24h}</div>
      <div>PERCENT CHANGE 7D: ${tickersData?.quotes.USD.percent_change_7d}</div>
      <div>PERCENT CHANGE 30D: ${tickersData?.quotes.USD.percent_change_30d}</div>
      <div>PERCENT CHANGE 1Y: ${tickersData?.quotes.USD.percent_change_1y}</div>
      <div>PERCENT FROM PRICE ATH: ${tickersData?.quotes.USD.percent_from_price_ath}</div>
      <div>PRICE: ${tickersData?.quotes.USD.price}</div>
      <div>VOLUME 24H: ${tickersData?.quotes.USD.volume_24h}</div>
      <div>VOLUME 24H CHANGE 24H: ${tickersData?.quotes.USD.volume_24h_change_24h}</div>
    </div>
  )
}

export default Price