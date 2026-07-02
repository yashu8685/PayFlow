import api from "./api";

export const createPayment = async (paymentData) => {
  const response = await api.post("payments/create/", paymentData);
  return response.data;
};

