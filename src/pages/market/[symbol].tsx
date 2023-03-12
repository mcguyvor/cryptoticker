import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { PAIR } from "../../types/ticker";
import { startPolling, stopPolling, ticker } from "../../stores/tickerSlice";
import { Button } from "antd";
import styles from "../../styles/Symbol.module.scss";
import React from "react";
import TickerDetail from "../../components/TickerDetail";
import Head from "next/head";

const tokenSymbol = (): JSX.Element => {
  const router = useRouter();

  const { symbol } = router.query;

  const { value, isLoading, errorMessage } = useSelector(ticker);

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
    <>
      <Head>
        <title>Crypto Price</title>
        <meta property='og:title' content='Crypto Price' key='title' />
      </Head>
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
            isLoading={isLoading}
            data={value}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </>
  );
};

export default tokenSymbol;
