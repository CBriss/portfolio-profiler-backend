const baseUrl = "https://cloud.iexapis.com/stable/";
import fetch from "node-fetch";

import IexRequest from "../models/iex_request.js";

export const getPricesInBatch = async (symbolsArray) => {
  console.log(`getPricesInBatch API call for ${symbolsArray}`);
  let requestURL = `${baseUrl}stock/market/batch?symbols=${symbolsArray.join(
    ","
  )}&types=quote`;
  const response = await fetch(requestURL + `&token=${process.env.IEX_KEY}`);
  const data = await response.json();
  logRequest(requestURL);
  return data.close;
};

export const getTickerPrice = async (ticker) => {
  console.log(`getTickerPrice API call for ${ticker}`);
  let requestURL = `${baseUrl}stock/${ticker}/previous`;
  const response = await fetch(requestURL + `?token=${process.env.IEX_KEY}`);
  const data = await response.json();
  logRequest(requestURL);
  return data.close;
};

function logRequest(requestURL) {
  const newRequest = new IexRequest({ url: requestURL });
  newRequest.save();
}
