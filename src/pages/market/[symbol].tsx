import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useFetchTicker from "../../hooks/useFetchTicker";
import { useDispatch, useSelector } from "react-redux";
import { selectingSymbol } from "../../store/symbol";
const tokenSymbol = () => {
  const router = useRouter();
  const { symbol } = router.query;

  const selectedSymbol = useSelector((state) => state.selectingSymbol.value);

  const dispatch = useDispatch();

  const { data, err, isLoading } = useFetchTicker(selectedSymbol);

  const [lastPrice, setLastPrice] = useState<string>("");

  const handleClick = (symbol: string) => {
    router.push(symbol);
  };

  // change state from router.query
  useEffect(() => {
    if (symbol) {
      dispatch(selectingSymbol(symbol));
    }
  }, [symbol]);

  useEffect(() => {
    if (data) {
      setLastPrice(data.lastPrice);
    }
  }, [data]);
  return (
    <>
      <div onClick={() => dispatch(selectingSymbol("test"))}>
        Click {selectedSymbol}
      </div>
      <div onClick={() => handleClick("BTC_THB")}>BTC/THB</div>
      <div onClick={() => handleClick("BUSD_THB")}>BUSD/THB</div>
      <div onClick={() => handleClick("USDT_THB")}>USDT/THB</div>
      {data && (
        <div>
          <div>{selectedSymbol}</div>
          <div>{isLoading ? "loading" : lastPrice}</div>
        </div>
      )}
    </>
  );
};

export default tokenSymbol;
