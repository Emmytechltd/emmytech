import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info, X, XCircle } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const icons = {
  success: <CheckCircle size={18} className="text-[var(--green)]" />,
  error: <XCircle size={18} className="text-[var(--red)]" />,
  info: <Info size={18} className="text-[var(--blue)]" />,
  warning: <Info size={18} className="text-[var(--amber)]" />,
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-[360px] shadow-[var(--shadow-lg)] pointer-events-auto"
          >
            {icons[t.type]}
            <p className="flex-1 text-sm text-[var(--fg)] font-medium">{t.message}</p>
            <button
              onClick={() => dismissToast(t.id)}
              className="text-[var(--fg3)] hover:text-[var(--fg)] transition-colors"
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
