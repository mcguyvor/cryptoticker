import { Card, Spin, Avatar, Space, Row, Col, Typography } from "antd";
import { TickerResponse, PAIR } from "../types/ticker";
import styles from "../styles/Symbol.module.scss";
import { symbols } from "../static/symbols";
import { formatNum } from "../utils/formatNum";

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
    <Card style={{ width: "50%", paddingTop: "0", height: "150px" }}>
      <p>{errorMessage}</p>
    </Card>
  ) : (
    data && (
      <Card
        style={{ width: "50%", paddingTop: "0", height: "150px" }}
        bodyStyle={{ paddingTop: "0" }}
      >
        <div className={styles.tickerTitle}>
          <Space>
            <Avatar src={symbols[symbol].img} />
            <p>{symbols[symbol].displayText}</p>
          </Space>
        </div>
        {isLoading ? (
          <Spin tip='Loading' />
        ) : (
          <>
            <Row>
              <Col span={12}>
                <Meta
                  title={`${formatNum(data.lastPrice)} THB`}
                  description={
                    <div>
                      Volume: {data.volume}
                      <br />
                      High Price: {formatNum(data.highPrice)} THB
                      <br />
                      Low Price: {formatNum(data.lowPrice)} THB
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
      </Card>
    )
  );
};
export default TickerDetail;
