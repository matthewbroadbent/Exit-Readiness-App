import { useEffect, useRef } from 'react'
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { Radar } from 'react-chartjs-2'

// Register required Chart.js components
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

function ScoreChart({ scores }) {
  const chartRef = useRef(null)
  
  const data = {
    labels: [
      'Financial Readiness',
      'Business Operations',
      'Legal & Compliance',
      'Market Position',
      'Succession Planning',
      'Personal Readiness'
    ],
    datasets: [
      {
        label: 'Your Score',
        data: [
          scores.financialReadiness || 0,
          scores.businessOperations || 0,
          scores.legalCompliance || 0,
          scores.marketPosition || 0,
          scores.successionPlanning || 0,
          scores.personalReadiness || 0
        ],
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(14, 165, 233, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(14, 165, 233, 1)'
      }
    ]
  }
  
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 2
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Score: ${context.raw}/10`;
          }
        }
      }
    },
    maintainAspectRatio: false
  }
  
  return (
    <div className="h-80 md:h-96">
      <Radar ref={chartRef} data={data} options={options} />
    </div>
  )
}

export default ScoreChart
