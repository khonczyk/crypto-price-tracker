import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SmallChart = (props) => {
  const { points, change7d } = props;

  const chartColor = change7d >= 0 ? '#8dc647' : '#e15241';

  const options = {
    title: false,
    legend: { enabled: false },
    credits: { enabled: false },
    chart: {
      type: 'line',
      backgroundColor: false,
      height: (7 / 16) * 100 + '%',
    },
    xAxis: { visible: false },
    yAxis: { visible: false },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        states: {
          hover: false,
        },
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    series: [
      {
        data: points,
        color: chartColor,
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      className="red-bla"
    />
  );
};

export default SmallChart;
