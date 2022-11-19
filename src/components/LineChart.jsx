import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import millify from 'millify';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({coinHistory, currentPrice, coinName}) => {

    const coinPrice =[];
    const coinTimestamp = [];

     for (let i = 0; i < coinHistory?.length; i++) {
        
       coinPrice.push(coinHistory[i]?.price)
        coinTimestamp.push(new Date(coinHistory[i]?.timestamp).toLocaleDateString())
     }
    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

  return (
    <>
        <Row className='chart-header'>
            <Typography level={2} className='chart-title'>{coinName} Price chart</Typography>
            <Col className='price-container'>
                <Typography level={5} className='current-price'>{coinName} Price: $ {millify(currentPrice)}</Typography>
            </Col>
        </Row>
        <Line data={data}  options={options}/>
    </>
  )
}

export default LineChart;
