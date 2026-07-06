const [loading, setLoading] = useState(true);

const loadPayments = async () => {
  try {
    const paymentData = await getPayments();
    const statsData = await getDashboardStats();

    setPayments(paymentData);
    setStats(statsData);
  } finally {
    setLoading(false);
  }
};

if (loading) {
  return <Loading />;
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;