import React, { useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptoCoinsQuery } from '../services/cryptoApi';

import icon from '../images/coinss.png'

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const {data, isFetching} = useGetCryptoCoinsQuery(count);
  
    
    const [searchTerm, setSearchTerm] = useState('');

    if(isFetching) return 'Loading...'

    const filteredData = data.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
    {!simplified && (<div className="search-crypto">
        <Input placeholder='Search Cryptocurency' onChange={(e) => setSearchTerm(e.target.value)}></Input>
      </div>
      )}
      
      <Row gutters={[32,32]} className="crypto-card-container">
        {filteredData.map((currensy) =>(
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currensy.id}>
            <Link to={`/crypto/${currensy.id}`}>
              <Card 
                  title={`${currensy.rank}. ${currensy.name}`}
                   extra={<img className="crypto-image" src={icon} alt=""/>}
                  hoverable
                  >
                    <p>Price: {millify(currensy.quotes.USD.price)}</p>
                    <p>Market cap: {millify(currensy.quotes.USD.market_cap)}</p>
                  </Card>
            </Link>
          </Col>
        ))}
     </Row> 
    </>
  )
}

export default Cryptocurrencies
