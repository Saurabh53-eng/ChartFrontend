import React  from 'react';

import { useEffect, useState } from 'react';
import CanvasJSReact from '../assests/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = () => {
  const [chart, setChart] = useState([])
  var baseUrl = "https://chartdatabasebackend.herokuapp.com/api/v1/fetchallemployees";

  useEffect(() => {
    const fetchallEmployees = async () => {
      // API Call 
      await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json);
            setChart(json)
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    };
    fetchallEmployees()
  }, [baseUrl])

  var result = chart.map(x => ({ label: x.sector, y: x.intensity }));
  var result1 = chart.map(x => ({ label: x.topic, y: x.intensity }));
  var result2 = chart.map(x => ({ label: x.country, y: x.intensity,indexLabel:x.country }));
  var result3 = chart.map(x => ({ label: x.relevance, y: x.relevance }));
  var result4 = chart.map(x => ({ label: x.likelihood, y: x.likelihood }));
  var result5 = chart.map(x => ({ label: x.title, y: x.intensity }));

  const options = {
    animationEnabled: true,
    title: {
      text: "Energy intensity of country with information"
    },
    axisY: {
      title: "Intensity",
      includeZero: true
    },
    axisX: {
      title:"sector",
      //labelWrap: false, // true by default.
      labelMaxWidth: 100,
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [{
      showInLegend: true,
      name: 'sector',
      dataPoints: result
    },
    {
      type: 'column',
      showInLegend: true,
      name: "topic",
      axisYType: "secondary",
      dataPoints: result1
    },
    {
      type: 'column',
      showInLegend: true,
      name: "country",
      dataPoints: result2
    },
    {
      type: 'column',
      showInLegend: true,
      name: "relevance",
      dataPoints: result3
    },
    {
      type: 'column',
      showInLegend: true,
      name: "likelihood",
      dataPoints: result4
    },
    {
      type: 'column',
      showInLegend: true,
      name: "title",
      dataPoints: result5
    },
    ]
  }

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
  return (
    <div>
      <CanvasJSChart options={options}
      /* onRef = {ref => this.chart = ref} */
      />
    </div>
  )
}

export default BarChart




