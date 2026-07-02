import { useState } from "react";
import QRCode from "react-qr-code";
import { createPayment } from "../services/payment";

function Payment() {
  const [form, setForm] = useState({
    receiver_name: "",
    upi_id: "",
    amount: "",
  });

  const [upiLink, setUpiLink] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createPayment(form);
      setUpiLink(data.upi_link);
    } catch (error) {
      console.error(error);
      alert("Payment creation failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Payment</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="receiver_name"
          placeholder="Receiver Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="upi_id"
          placeholder="UPI ID"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Generate Payment
        </button>
      </form>

      {upiLink && (
        <div className="mt-6 text-center">
          <QRCode value={upiLink} size={200} />

          <a
            href={upiLink}
            className="block mt-4 bg-green-600 text-white py-2 rounded"
          >
            Pay Now
          </a>
        </div>
      )}
    </div>
  );
}

export default Payment;