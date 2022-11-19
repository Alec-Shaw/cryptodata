import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies, News} from '../components'


const { Title } = Typography;

const Homepage = () => {
     const { data, isFetching } = useGetCryptosQuery();
 
     if(isFetching) return 'Loading...'
     

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={data.cryptocurrencies_number}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(data.volume_24h_percent_to_ath)}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(data.volume_24h_ath_value)}/></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(data.volume_24h_usd)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(data.last_updated)}/></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className="show-more"><Link to ="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest crypto news</Title>
        <Title level={3} className="show-more"><Link to ="/news">Show more</Link></Title>
      </div>
      <News simplified/>
    </>
  )
}

export default Homepage
