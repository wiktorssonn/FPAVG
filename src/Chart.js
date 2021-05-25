import React from 'react';
import { Line } from 'react-chartjs-2';

// Komponenten som returnerar en graf med data från vald aktie
export default function Chart(props) {

    return (
      <div className="container">
        <Line id="test"
          data={{
            labels: props.graphLabels,
            datasets: [
              {
                label: 'Kurs i dollar',
                data: props.graphData,
                backgroundColor: [
                  '#fff',
                ],
                borderColor: [
                  '#43B0BF',
                ],
                borderWidth: 2
              }
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  }
                }
              ]
            },
            plugins: {
              legend: {
                onClick: {},
                labels: {
                  boxWidth: 0,
                  color: "#333",
                  font: {
                    size: 20
                  }
                },
              }
            }
           }
          }
        />
      </div>
    )
  }