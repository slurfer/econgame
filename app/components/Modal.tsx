"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: "success" | "error" | "info";
  children?: ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  message,
  type = "info",
  children,
}: ModalProps) {
  const colors = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative w-11/12 max-w-md rounded-2xl border shadow-xl p-6 ${colors[type]} bg-white`}
          >
            {title && (
              <h2 className="text-lg font-semibold mb-2 text-center">
                {title}
              </h2>
            )}
            {message && <p className="text-center mb-4">{message}</p>}
            {children}
            <div className="mt-4 flex justify-center">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
