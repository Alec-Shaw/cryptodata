import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  //  'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
  //  'X-RapidAPI-Host': 'bloomberg-market-and-financial-news.p.rapidapi.com'
      
    
}

const baseUrl = 'https://api.coinpaprika.com/v1';

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptos: builder.query({  
        query: () => createRequest('/global'),
      }),
      getCryptoCoins: builder.query({  
        query: (count) => createRequest(`/tickers?limit=${count}`),
      }),
      getCryptoDetails: builder.query({  
        query: (coinId) => createRequest(`/tickers/${coinId}`),
      }),
      getCryptoHistory: builder.query({  
        query: ({coinId, timePeriod}) => createRequest(`/tickers/${coinId}/historical?start=2022-01-01&interval=${timePeriod}`),
      }),
      getCryptoExchange: builder.query({  
        query: () => createRequest(`/exchanges`),
      })         
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoCoinsQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetCryptoExchangeQuery
} = cryptoApi;
