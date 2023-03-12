import { Card, Spin, Avatar, Space, Row, Col } from "antd";
import { TickerResponse, PAIR } from "../types/ticker";
import styles from "../styles/Symbol.module.scss";
import { symbols } from "../static/symbols";
import { formatPrice } from "../utils/formatNum";
import TickerCard from "./TickerCard";

interface TickerDetailProps {
  symbol: PAIR;
  isLoading: boolean;
  data: TickerResponse;
  errorMessage: string;
}

const { Meta } = Card;

const TickerDetail = ({
  symbol,
  isLoading,
  data,
  errorMessage,
}: TickerDetailProps) => {
  return errorMessage ? (
    <TickerCard>
      <p>{errorMessage}</p>
    </TickerCard>
  ) : (
    data && (
      <TickerCard>
        <div className={styles.tickerTitle}>
          <Space>
            <Avatar src={symbols[symbol].img} />
            <p>{symbols[symbol].displayText}</p>
          </Space>
        </div>
        {isLoading ? (
          <Spin tip='Loading' style={{ marginTop: "16px" }} />
        ) : (
          <>
            <Row>
              <Col span={12}>
                <Meta
                  title={formatPrice(data.lastPrice)}
                  description={
                    <div>
                      Volume: {data.volume}
                      <br />
                      High Price: {formatPrice(data.highPrice)}
                      <br />
                      Low Price: {formatPrice(data.lowPrice)}
                    </div>
                  }
                />
              </Col>
              <Col span={12}>
                <div
                  className={
                    Math.sign(Number(data.priceChangePercent)) === -1
                      ? styles.primaryRed
                      : styles.primaryGreen
                  }
                >
                  <b>{`${Number(data.priceChangePercent).toFixed(2)}%`}</b>
                </div>
                24h change
              </Col>
            </Row>
          </>
        )}
      </TickerCard>
    )
  );
};
export default TickerDetail;
