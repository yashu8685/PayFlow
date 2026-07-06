import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPayments } from "../services/payment";

import { motion } from "framer-motion";

import { getDashboardStats } from "../services/payment";
import StatCard from "../components/StatCard";

import PaymentLineChart from "../components/charts/PaymentLineChart";
import PaymentPieChart from "../components/charts/PaymentPieChart";

import { exportExcel } from "../services/payment";

import Card from "../components/Card";

import { exportPDF } from "../services/payment";

import { updatePaymentStatus } from "../services/payment";


const handlePDF = async () => {
  const data = await exportPDF();

  const url = window.URL.createObjectURL(new Blob([data]));

  const link = document.createElement("a");

  link.href = url;

  link.download = "payments.pdf";

  link.click();
};


const handleExport = async () => {
  try {
    const data = await exportExcel();

    const url = window.URL.createObjectURL(new Blob([data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "payments.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error(error);
  }
};



function Dashboard() {


  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    total_payments: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    total_amount: 0,
  });

  const [payments, setPayments] = useState([]);

  useEffect(() => {

    loadPayments();

  }, []);

  const loadPayments = async () => {
    try {
      const paymentData = await getPayments();
      const statsData = await getDashboardStats();

      setPayments(paymentData);
      setStats(statsData);
    } catch (err) {
      console.log(err);
    }
  };

  const changeStatus = async (id, status) => {

    try {

      await updatePaymentStatus(id, status);

      loadPayments();

    }
    catch (err) {

      console.log(err);

    }

  }

  return (

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    
    
    className="max-w-6xl mx-auto mt-10">

      <div className="flex justify-between mb-8">

        <h1 className="text-4xl font-bold">

          Dashboard

        </h1>

        <Link
          to="/payment"
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >

          Create Payment

        </Link>

        <Link
          to="/profile"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          My Profile
        </Link>

        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>

        <button
          onClick={handlePDF}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <Card
          title="Total Payments"
          value={stats.total_payments}
          color="bg-blue-600"
        />

        <Card
          title="Completed"
          value={stats.completed}
          color="bg-green-600"
        />

        <Card
          title="Pending"
          value={stats.pending}
          color="bg-yellow-500"
        />

        <Card
          title="Total Amount"
          value={`₹${stats.total_amount}`}
          color="bg-purple-600"
        />

      </div>

      <input
        type="text"
        placeholder="Search by receiver or UPI ID..."
        className="w-full md:w-80 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
        <br /><br />

      <div className="grid md:grid-cols-2 gap-8 mb-10">

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-bold mb-4">
            Monthly Payment Trend
          </h2>

          <PaymentLineChart
            payments={payments}
          />
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-bold mb-4">
            Payment Status
          </h2>

          <PaymentPieChart
            payments={payments}
          />
        </div>

      </div>

      <table className="w-full border mb-3">

        <thead className="bg-blue-600 ">

          <tr className="bg-gray-100">

            <th className="p-3">Receiver</th>

            <th>UPI ID</th>

            <th>Amount</th>

            <th>Status</th>

            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {

            payments
              .filter(
                (payment) =>
                  payment.receiver_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  payment.upi_id
                    .toLowerCase()
                    .includes(search.toLowerCase())
              ).map(payment => (

                <tr
                  key={payment.id}
                  className="text-center border-t hover:bg-gray-100 transition"
                >

                  <td>{payment.receiver_name}</td>

                  <td>{payment.upi_id}</td>

                  <td>₹ {payment.amount}</td>

                  <td className="p-3">
                    <select
                      value={payment.status}
                      onChange={(e) =>
                        changeStatus(
                          payment.id,
                          e.target.value
                        )
                      }
                      className="border rounded px-2 py-1"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Failed">
                        Failed
                      </option>

                    </select>
                  </td>

                  <td>
                    {
                      new Date(
                        payment.created_at
                      ).toLocaleDateString()
                    }
                  </td>

                </tr>

              ))

          }

        </tbody>

      </table>

    </motion.div>

  )

}

export default Dashboard