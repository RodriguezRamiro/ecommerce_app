// frontend/src/components/CartDrawer.jsx


import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity, }) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1),
  0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
        {/* Overlay */}
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        />

      {/* Drawer */}
      <motion.div
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl"
            arial-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-10rem)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <img
                src={item.img}
                alt={item.name}
                className="w-2 h-14 object-cover rounded"
                />
                <div className="flex-1 px-3">
                  <h3 className="text-sm font-medium text-gray-800">{item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                          disabled={(item.quantity || 1) <= 1}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity || 1}</span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

        {/* Footer */}
        <div className="p-4 border-t bg- white sticky bottom-0">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-800">Total:</span>
            <span className="font-semibold text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <Link
            to="/checkout"
            className="w-full block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={onClose} // Close drawer when navigating
          >
            Checkout
          </Link>
        </div>
      </motion.div>
    </>
    )}
    </AnimatePresence>
  );
}