import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { PAIR } from "../../types/ticker";
import { selectTicker } from "../../tickerSlice";
import { Col, Row, Button, Space, Card } from "antd";
import styles from "../../styles/Symbol.module.scss";
import React from "react";

const { Meta } = Card;

const tokenSymbol: React.FC = () => {
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

      const path = window.location.href.split("/").pop();
      if (values.includes((path as unknown) as PAIR)) {
        //TODO:  Fix type
        fetchTicker(path);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
        {data && (
          <Card style={{ width: "50%", paddingTop: "8px" }}>
            {/* <div>{symbol}</div> */}
            <p>{symbol}</p>
            {/* <p>
              <b>{data.lastPrice}</b>
            </p> */}
            <Meta
              title={data.lastPrice}
              description={`Volume: ${data.volume}`}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default tokenSymbol;
