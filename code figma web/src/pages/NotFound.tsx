import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: "var(--bg)" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <div className="font-display font-black text-[120px] sm:text-[160px] leading-none gradient-text mb-4 opacity-20">
          404
        </div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-[var(--fg)] mb-3 -mt-8">
          Page Not Found
        </h1>
        <p className="text-[var(--fg2)] mb-8">
          The page you're looking for doesn't exist. It may have moved or the URL is incorrect.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => navigate(-1)} variant="secondary" size="md">
            <ArrowLeft size={16} /> Go Back
          </Button>
          <Link to="/">
            <Button variant="primary" size="md">
              <Home size={16} /> Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
