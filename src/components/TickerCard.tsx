import { Card } from "antd";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const TickerCard = ({ children }: Props) => {
  return (
    <Card
      style={{
        width: "50%",
        paddingTop: "0",
        maxHeight: "fit-content",
        minHeight: "170px",
      }}
      bodyStyle={{ paddingTop: "0" }}
    >
      {children}
    </Card>
  );
};

export default TickerCard;
