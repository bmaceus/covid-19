import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchApi();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#5a3ee1",
            backgroundColor: "rgba(88, 61, 225, 0.506)",
            fill: true,
            borderWidth: 3,
            lineTension: 0,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "#fd417e",
            backgroundColor: "rgba(253, 65, 125, 0.412)",
            fill: true,
            borderWidth: 3,
            lineTension: 0,
          },
        ],
      }}
      options={{
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              gridColor: "red",
              ticks: {
                fontColor: "#fff",
                min: 0,
                maxTicksLimit: 8,
                beginAtZero: true,
                callback: function (value) {
                  if (Number.isInteger(value)) {
                    return value;
                  }
                },
              },
            },
          ],
        },
        legend: {
          display: false,
          labels: {
            fontColor: "red",
            defaultFontSize: 50,
          },
        },
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["#573fd5", "#0fb9b6", "#f9308e"],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          fontSize: 16,
          display: true,
          text: `Curent State In: ${country}`,
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              gridColor: "red",
              ticks: {
                fontColor: "#fff",
                min: 0,
                maxTicksLimit: 8,
                beginAtZero: true,
                callback: function (value) {
                  if (Number.isInteger(value)) {
                    return value;
                  }
                },
              },
            },
          ],
        },
        legend: {
          display: false,
          labels: {
            fontColor: "red",
            defaultFontSize: 50,
          },
        },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
