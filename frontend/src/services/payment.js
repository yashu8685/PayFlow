import api from "./api";

export const createPayment = async (paymentData) => {
  const response = await api.post("payments/create/", paymentData);
  return response.data;
};

export const getPayments = async () => {
    const response = await api.get("payments/history/");
    return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("payments/stats/");
  return response.data;
};


export const updatePaymentStatus = async (id, status) => {
  const response = await api.patch(
    `payments/update/${id}/`,
    {
      status,
    }
  );

  return response.data;
};







export const exportExcel = async () => {
  const response = await api.get("payments/export/excel/", {
    responseType: "blob",
  });

  return response.data;
};



export const exportPDF = async () => {
  const response = await api.get("payments/export/pdf/", {
    responseType: "blob",
  });

  return response.data;
};


export const deletePayment = async (id) => {
  const response = await api.delete(
    `payments/delete/${id}/`
  );

  return response.data;
};


