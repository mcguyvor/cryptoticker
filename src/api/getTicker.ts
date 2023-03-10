import instance from "./request";
import { TickerResponse } from "../types/ticker";

const getTicker = (symbol: string) => {
  const response = instance.get<void, TickerResponse>(
    `/ticker/24hr?symbol=${symbol}`
  );
  return response;
};

export default getTicker;
