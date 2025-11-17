// frontend/src/context/StoreContext.jsx

import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [selectedStore, setSelectedStore] = useState(null);

  const clearStore = () => setSelectedStore(null);

  return (
    <StoreContext.Provider value={{ selectedStore, setSelectedStore, clearStore }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
