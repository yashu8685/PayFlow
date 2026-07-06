import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function PaymentLineChart({ payments }) {

  const labels = payments.map((p) =>
    new Date(p.created_at).toLocaleDateString()
  );

  const amounts = payments.map((p) => Number(p.amount));

  const data = {
    labels,
    datasets: [
      {
        label: "Payment Amount",
        data: amounts,
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
}

export default PaymentLineChart;