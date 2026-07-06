import { motion } from "framer-motion";

function Card({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`rounded-xl shadow-lg p-6 text-white ${color}`}
    >
      <h3 className="text-lg">{title}</h3>

      <p className="text-3xl font-bold mt-3">
        {value}
      </p>
    </motion.div>
  );
}

export default Card;