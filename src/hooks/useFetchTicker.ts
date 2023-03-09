import { useEffect, useState } from "react";
import getTicker from "../api/getTicker";
import { TickerResponse } from "../types/ticker";

function useFetchTicker(symbol: string) {
  const [data, setData] = useState<TickerResponse | null>(null);
  const [err, setErr] = useState<any>(null);
  const [isLoading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    if (symbol) {
      setLoading(true);

      const fetchTicker = async () => {
        try {
          const data = await getTicker(symbol);
          setData(data);
          setLoading(false);
        } catch (err) {
          setErr(err);
        }
      };
      // setInterval(fetchTicker, 5000);
      // clearInterval(myInterval);
      fetchTicker();
    }
  }, [symbol]);

  return { data, err, isLoading };
}

export default useFetchTicker;
