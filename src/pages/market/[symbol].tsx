import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import getTicker from "../../api/getTicker";
import useFetchTicker from "../../hooks/useFetchTicker";
import { useDispatch, useSelector } from "react-redux";
// import { selectingSymbol } from "../../store/symbol";
import { selectingSymbol } from "../../store/symbol";
const tokenSymbol = () => {
  const router = useRouter();
  const { symbol } = router.query;

  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  // const selectedSymbol = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const { data, err, isLoading } = useFetchTicker(selectedSymbol);

  const [lastPrice, setLastPrice] = useState<string>("");

  const count = useSelector((state) => state.selectingSymbol.value);

  const handleClick = (symbol: string) => {
    // dispatch(selectingSymbol(symbol));
    // e.preventDefault();
    setSelectedSymbol(symbol);
    //TODO:  optimise to use  query
    // router.replace(`/market/${symbol}`);
  };

  // useEffect(() => {
  //   const fetch = async () => {
  //     if (symbol) {
  //       const data = await getTicker(symbol);
  //       console.log("data", data);
  //       setSelectedSymbol(symbol);
  //     }
  //   };
  //   fetch();
  // }, [symbol]);

  // change state from router.query
  useEffect(() => {
    if (symbol) {
      setSelectedSymbol(symbol);

      // dispatch(selectingSymbol(symbol));
    }
  }, [symbol]);

  console.log(data);

  useEffect(() => {
    if (data) {
      setLastPrice(data.lastPrice);
      console.log("lastPrice", lastPrice);
    }
  }, [data]);
  return (
    <>
      <div onClick={() => dispatch(selectingSymbol("test"))}>Click {count}</div>
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
