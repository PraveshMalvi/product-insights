import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const labels = [
  'Products Shown\n1.27M Products',
  'Shortlisted\n984K Products',
  'Finalised\n953K Products',
  'Checkout\n559K Products',
  'Net Revenue\n₹10,40,00,000',
]

const data: ChartData<'bar'> = {
  labels,
  datasets: [
    {
      label: 'Base',
      data: [1000000, 2000900, 109000, 87000, 19990],
      borderColor: 'rgba(0,0,0,0)',
      stack: 'waterfall',
      barThickness: 30,
      backgroundColor: [
        'rgba(1, 47, 72, 1)',
        'rgba(1, 47, 72, 1)',
        'rgba(1, 47, 72, 1)',
        'rgba(1, 47, 72, 1)',
        'rgba(22, 163, 74, 1)',
      ],
    },
    {
      label: 'Base',
      data: [10000, 2900, 109000, 87000, 19990],
      borderColor: 'rgba(0,0,0,0)',
      stack: 'waterfall',
      barThickness: 30,
      backgroundColor: 'rgba(239, 68, 68, 1)',
    },
  ],
}

function WaterfallChart() {
  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            position: 'top',
            ticks: {
              callback: function (value, index) {
                return (this.getLabelForValue(index) as string).split('\n')
              },
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            max: 200000,
            reverse: true,
          },
        },
      }}
    />
  )
}

export default WaterfallChart
