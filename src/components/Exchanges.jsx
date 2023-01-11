import React from "react";
import { Row, Col, Collapse, Typography } from "antd";
import { useGetCryptoExchangeQuery } from "../services/cryptoApi";
import HTMLReactParser from "html-react-parser";
import millify from "millify";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchangesList, isFetching } = useGetCryptoExchangeQuery();

  if (isFetching) return "Loadin...";

  return (
    <>
      <Row>
        <Col span={6} className="ant-card-head-title">
          Exchanges
        </Col>
        <Col span={6} className="ant-card-head-title">
          24h Trade Volume
        </Col>
        <Col span={6} className="ant-card-head-title">
          Markets
        </Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>
                      ${millify(exchange.quotes.USD.adjusted_volume_24h)}
                    </Col>
                    <Col span={6}>{millify(exchange.markets)}</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
