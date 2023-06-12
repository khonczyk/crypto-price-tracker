import React, { useCallback, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Loader from '../global/Loader';

const CoinChart = (props) => {
  const { id, change7d } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chartRange, setChartRange] = useState('7d');
  const [coinChart, setCoinChart] = useState(null);

  const chartColor = change7d >= 0 ? '#8dc647' : '#e15241';

  const ranges = [
    ['24h', '1d'],
    ['7d', '7d'],
    ['14d', '14d'],
    ['30d', '30d'],
    ['90d', '90d'],
    ['180d', '180d'],
    ['1y', '365d'],
    ['Max', 'max'],
  ];

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${chartRange}`
      );
      const data = await response.json();

      if (data) {
        setCoinChart(data.prices);
      } else {
        setCoinChart([]);
      }
      setLoading(false);
    } catch (error) {
      console.log('There was an error', error);
      setLoading(false);
      setError(true);
    }
  }, [id, chartRange]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  if (loading) return <Loader />;
  if (error) return <div>Couldnt fetch data, check console</div>;

  const options = {
    title: false,
    legend: { enabled: false },
    credits: { enabled: false },
    chart: {
      type: 'line',
      backgroundColor: false,
      renderTo: 'chartcontainer',
    },
    xAxis: {
      type: 'datetime',
      tickColor: '#6c757d',
      labels: {
        style: {
          color: '#6c757d',
          fontSize: '1.2rem',
          fontWeight: '700',
        },
      },
    },
    yAxis: {
      title: false,
      gridLineColor: '#6c757d',
      gridLineWidth: 0.5,
      labels: {
        format: '${value:,f}',
        style: {
          color: '#6c757d',
          fontSize: '1.2rem',
          fontWeight: '700',
        },
      },
    },
    series: [
      {
        name: 'Price',
        data: coinChart,
        color: chartColor,
      },
    ],
    tooltip: {
      style: {
        fontSize: '1.2rem',
      },
    },
  };

  return (
    <>
      <div className="chart__range">
        {ranges.map((range) => (
          <button
            key={range[0]}
            className={`chart__button ${
              range[1] === chartRange ? 'chart__button--selected' : ''
            }`}
            onClick={() => setChartRange(range[1])}
          >
            {range[0]}
          </button>
        ))}
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default CoinChart;
