import React, { useState, useEffect } from 'react';
import SymbolCard from '../../components/SymbolCard/SymbolCard';

const Home = () => {
  const [ws, setWs] = useState(null);
  const [symbolsData, setSymbolsData] = useState({});
  const symbols = ['BTC/USD', 'ETH/USD', 'DOGE/USD', 'ADA/USD'];

  const apiKey = process.env.REACT_APP_KEY_ID;
  const secretKey = process.env.REACT_APP_SECRET_KEY_ALP;

  useEffect(() => {
    const socket = new WebSocket('wss://stream.data.alpaca.markets/v1beta3/crypto/us');

    socket.onopen = () => {
      console.log('WebSocket connection opened');

      // Authenticate
      const authMsg = {
        action: 'auth',
        key: apiKey,
        secret: secretKey,
      };
      socket.send(JSON.stringify(authMsg));

      // Subscribe to trade and bar updates for all symbols
      const subscribeMsg = {
        action: 'subscribe',
        bars: symbols,
      };
      socket.send(JSON.stringify(subscribeMsg));

      setWs(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const symbol = data[0].S;
      if (data[0].T === 't' || data[0].T === 'b') {
        setSymbolsData((prevData) => {
          const newData = { ...prevData };

          if (!newData[symbol]) {
            console.log('New symbol:', symbol);
            newData[symbol] = {bars:[{ x: new Date(data[0].t), y: [parseFloat(data[0].o), parseFloat(data[0].h), parseFloat(data[0].l), parseFloat(data[0].c)] }]};
          }
          if (data[0].T === 'b') {  
          newData[symbol].bars.push({ x: new Date(data[0].t), y: [parseFloat(data[0].o), parseFloat(data[0].h), parseFloat(data[0].l), parseFloat(data[0].c)] });
            if (newData[symbol].length > 50) {
              newData[symbol] = newData[symbol].slice(-50);
            }
          }
          
          return newData;
        });
      }
      
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Trading Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
        symbols.map((symbol) => (
          <SymbolCard
            key={symbol}
            symbol={symbol}
            data={symbolsData[symbol] || []}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;