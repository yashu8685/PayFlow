import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PaymentPieChart({ payments }) {

  const completed = payments.filter(
    p => p.status === "Completed"
  ).length;

  const pending = payments.filter(
    p => p.status === "Pending"
  ).length;

  const failed = payments.filter(
    p => p.status === "Failed"
  ).length;

  const data = {
    labels: [
      "Completed",
      "Pending",
      "Failed",
    ],
    datasets: [
      {
        data: [
          completed,
          pending,
          failed,
        ],
        backgroundColor: [
          "#22c55e",
          "#facc15",
          "#ef4444",
        ],
      },
    ],
  };

  return <Pie data={data} />;
}

export default PaymentPieChart;