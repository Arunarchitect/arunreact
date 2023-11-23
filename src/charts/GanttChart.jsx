import React from "react";
import { Chart as ChartJS, BarController, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

ChartJS.register(BarController, CategoryScale, LinearScale, Tooltip, Legend);

function GanttChart() {
  const data = {
    labels: ["Project1", 'taks2'],
    datasets: [
      {
        label: "Planning",
        data: [{ x: '2022-10-01', y: 'Tak1', base: 0 }],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      }
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        time:{
            unit:'day'
        },
        position: "bottom",
        min: 0,
        max: 1, // Adjust the max value based on your timeline
      },
      y: {
        type: "category",
        position: "left",
        offset: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default GanttChart;
