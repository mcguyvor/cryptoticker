import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { PAIR } from "../../types/ticker";
import {
  selectTicker,
  loading,
  errMsg,
  startPolling,
  stopPolling,
} from "../../tickerSlice";
import { Button, Card, Spin } from "antd";
import styles from "../../styles/Symbol.module.scss";
import React from "react";
import TickerDetail from "../../components/TickerDetail";

const tokenSymbol: React.FC = () => {
  const router = useRouter();

  const { symbol } = router.query;

  const data = useSelector(selectTicker);

  const isLoading = useSelector(loading);

  const errorMessage = useSelector(errMsg);

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

  useEffect(() => {
    dispatch(startPolling());
    // cancel the polling when component unmounts
    return () => {
      dispatch(stopPolling());
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.dflex}>
        <div className={(styles.dflexCol, styles.flexChild1)}>
          <Button
            onClick={() => handleClick(PAIR.BTC_THB)}
            className={styles.child}
          >
            BTC/THB
          </Button>
          <Button
            onClick={() => handleClick(PAIR.BUSD_THB)}
            className={styles.child}
          >
            BUSD/THB
          </Button>
          <Button
            onClick={() => handleClick(PAIR.USDT_THB)}
            className={styles.child}
          >
            USDT/THB
          </Button>
        </div>

        <TickerDetail
          symbol={symbol}
          isLoading={isLoading}
          data={data}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

export default tokenSymbol;
