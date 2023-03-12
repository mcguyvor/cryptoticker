import { Card, Spin, Avatar, Space, Row, Col } from "antd";
import { TickerResponse } from "../types/ticker";
import styles from "../styles/Symbol.module.scss";
import { formatPrice } from "../utils/formatPrice";
import TickerCard from "./TickerCard";
import getAvatar from "../utils/getAvatar";

interface TickerDetailProps {
  isLoading: boolean;
  data: TickerResponse;
  errorMessage: string;
}

const { Meta } = Card;

const TickerDetail = ({
  isLoading,
  data,
  errorMessage,
}: TickerDetailProps): JSX.Element | null => {
  if (errorMessage) {
    return (
      <TickerCard>
        <p>{errorMessage}</p>
      </TickerCard>
    );
  }
  if (data === null) return null;

  const {
    symbol,
    lastPrice,
    volume,
    highPrice,
    lowPrice,
    priceChangePercent,
  } = data;

  return (
    <TickerCard>
      <div className={styles.tickerTitle}>
        <Space>
          <Avatar src={getAvatar(symbol)} />
          <p>{symbol.replace(/_/g, "/").toLocaleUpperCase()}</p>
        </Space>
      </div>
      {isLoading ? (
        <Spin tip='Loading' style={{ marginTop: "16px" }} />
      ) : (
        <>
          <Row>
            <Col span={12}>
              <Meta
                title={formatPrice(lastPrice)}
                description={
                  <div>
                    Volume: {volume}
                    <br />
                    High Price: {formatPrice(highPrice)}
                    <br />
                    Low Price: {formatPrice(lowPrice)}
                  </div>
                }
              />
            </Col>
            <Col span={12}>
              <div
                className={
                  Math.sign(Number(priceChangePercent)) === -1
                    ? styles.primaryRed
                    : styles.primaryGreen
                }
              >
                <b>{`${Number(priceChangePercent).toFixed(2)}%`}</b>
              </div>
              24h change
            </Col>
          </Row>
        </>
      )}
    </TickerCard>
  );
};
export default TickerDetail;
