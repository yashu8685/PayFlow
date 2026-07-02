import { Link } from "react-router-dom";
import Button from "./Button";

function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center bg-slate-100 px-6">
      <h1 className="text-5xl font-bold mb-6">
        Send Money Instantly 💸
      </h1>

      <p className="text-gray-600 text-lg max-w-2xl">
        PayFlow is a secure UPI payment tracker built with
        React and Django. Generate UPI payment links, track
        transactions, and manage payments with ease.
      </p>

      <div className="flex gap-4 mt-8">
        <Link to="/register">
          <Button>Get Started</Button>
        </Link>

        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;