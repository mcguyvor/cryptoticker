import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { PAIR } from "../../types/ticker";
import { selectTicker } from "../../tickerSlice";

const tokenSymbol = () => {
  const router = useRouter();
  const { symbol } = router.query;

  const data = useSelector(selectTicker);

  const dispatch = useDispatch();

  const fetchTicker = (symbol: PAIR) => {
    dispatch({ type: "FETCH_TICKER", payload: { symbol } });
  };

  const handleClick = (symbol: PAIR) => {
    router.push(symbol);
    fetchTicker(symbol);
  };

  // change state from router.query
  useEffect(() => {
    if (symbol) {
      fetchTicker(symbol);
    }
  }, [symbol]);

  // useEffect(() => {
  //   if (data) {
  // setLastPrice(data.lastPrice);
  // }
  // }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      const values = Object.values(PAIR);

      const par = window.location.href.split("/").pop();
      if (values.includes((par as unknown) as PAIR)) {
        //TODO:  Fix type
        fetchTicker(par);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div onClick={() => handleClick(PAIR.BTC_THB)}>BTC/THB</div>
      <div onClick={() => handleClick(PAIR.BUSD_THB)}>BUSD/THB</div>
      <div onClick={() => handleClick(PAIR.USDT_THB)}>USDT/THB</div>
      {data && (
        <div>
          <div>{symbol}</div>
          <div>{data.lastPrice}</div>
          {/* <div>{isLoading ? "loading" : lastPrice}</div> */}
        </div>
      )}
    </div>
  );
};

export default tokenSymbol;
