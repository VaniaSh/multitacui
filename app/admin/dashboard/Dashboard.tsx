'use client'
import Link from 'next/link'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import useSWR from 'swr'
import { formatNumber } from '@/lib/utils'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
}

const Dashboard = () => {
  const { data: summary, error } = useSWR(`/api/admin/orders/summary`)

  if (error) return error.message
  if (!summary) return 'Завантаження...'

  const salesData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  const productsData = {
    labels: summary.productsData.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Category',
        data: summary.productsData.map(
          (x: { totalProducts: number }) => x.totalProducts
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  }

  return (
    <div>
      <div className="flex justify-between bg-primary-foreground border-secondary mt-4 rounded-md px-3">
        <div className="flex flex-col gap-y-2 p-3">
          <div className="text-xl">Продажі</div>
          <div className="text-xl font-semibold text-orange-500">
            ₴{formatNumber(summary.ordersPrice)}
          </div>
          <div className="text-base font-light hover:underline">
            <Link href="/admin/orders">Переглянути</Link>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 p-3">
          <div className="text-xl">Замовлення</div>
          <div className="text-xl font-semibold text-orange-500">{summary.ordersCount}</div>
          <div className="text-base font-light hover:underline">
            <Link href="/admin/orders">Переглянути</Link>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 p-3">
          <div className="text-xl">Товари</div>
          <div className="text-xl font-semibold text-orange-500">{summary.productsCount}</div>
          <div className="text-base font-light hover:underline">
            <Link href="/admin/products">Переглянути</Link>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 p-3">
          <div className="text-xl">Користувачі</div>
          <div className="text-xl font-semibold text-orange-500">{summary.usersCount}</div>
          <div className="text-base font-light hover:underline">
            <Link href="/admin/users">Переглянути</Link>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-primary-foreground rounded">
          <h2 className="text-xl p-2">Статистика продажів</h2>
          <Line data={salesData}/>
        </div>
        <div className="bg-primary-foreground rounded">
          <h2 className="text-xl p-2">Товари</h2>
          <div className="flex items-center justify-center h-80 w-96 ">
            <Doughnut data={productsData}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
