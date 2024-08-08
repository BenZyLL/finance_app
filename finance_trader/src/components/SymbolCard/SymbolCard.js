import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const SymbolCard = ({ symbol, data }) => {
  const [isBotActive, setIsBotActive] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);

  useEffect(() => {
    if (data && data.bars && data.bars.length > 0) {
      const lastBar = data.bars[data.bars.length - 1];
      const lastClose = lastBar.y[3]; // Assuming y[3] is the closing price
      const firstClose = data.bars[0].y[3]; // Assuming y[3] is the closing price of the first bar
      setCurrentPrice(lastClose);
      setPriceChange(((lastClose - firstClose) / firstClose) * 100);
    }
  }, [data]);

  const handleBotToggle = () => {
    setIsBotActive((prev) => !prev);
  };

  
  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  else{
    const chartOptions = {
      chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'Stock Price',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
     // Format the data to match the candlestick chart requirements
    const formattedData = data.bars.map(bar => ({
      x: new Date(bar.x),
      y: bar.y
    }));
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-2">{symbol}</h2>
        <div className="text-lg mb-2">
          {currentPrice !== null && (
            <>
              <span>Current Price: {currentPrice.toFixed(4)}</span>
              <span className={`ml-4 ${priceChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                Change: {priceChange.toFixed(4)}%
              </span>
            </>
          )}
        </div>
        <button
          onClick={handleBotToggle}
          className={`px-4 py-2 rounded-md text-white transition-colors duration-200 ${
            isBotActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isBotActive ? 'Stop Bot' : 'Start Bot'}
        </button>
        <div className="mt-4 h-96">
          <ReactApexChart
            options={chartOptions}
            series={[{ data: formattedData }]}
            type="candlestick"
            height={350}
          />
        </div>
      </div>
    );
  }

  
};

export default SymbolCard;