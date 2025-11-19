//frontend/src/pages/StoreLocator.css

import React from 'react'
import { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import "./styles/StoreLocator.css";


const dummyStores = [
    { id: 1, name: "E-shop Downtown", city: "New York", zip: "10001", lat: 40.7128, lng: -74.006 },
    { id: 2, name: "E-shop Uptown", city: "New York", zip: "10027", lat: 40.8176, lng: -73.9532 },
    { id: 3, name: "E-shop Central", city: "Chicago", zip: "60601", lat: 41.8837, lng: -87.6234 },
    { id: 4, name: "E-shop Coast", city: "Los Angeles", zip: "90001", lat: 34.0522, lng: -118.2437 },
    { id: 5, name: "E-shop East", city: "Miami", zip: "33114", lat: 25.7617, lng: -80.1918 },
];

export default function StoreLocator({ compact = false, onSelectStore }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // Global store context
    const { selectedStore, setSelectedStore, defaultStore } = useCart();


// Auto Search on input
useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const lower = query.toLowerCase();
    const filtered = dummyStores.filter(
      (s) =>
        s.city.toLowerCase().includes(lower) ||
        s.zip.includes(query)
    );

    setResults(filtered);
  }, [query]);

  //select store handler
  const handleSelect = (store) => {
    setSelectedStore(store);
//optional callback
    if (onSelectStore){
      onSelectStore(store);
    }
//drop down after selection
    setQuery("");
    setResults([]);
  };

return (
    <div className={`store-locator ${compact ? "compact" : "full"}`}>
      {!compact && <h2>Find a Store Near You</h2>}

        {/* Search bar */}
        <form className="store-search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter city or ZIP code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Dropdown Results */}
      {query.trim() !== "" && (
        <div className="store-dropdown">
          {results.length === 0 ? (
            <p className="no-results">No stores found.</p>
          ) : (
            <ul>
              {results.map((store) => (
                <li key={store.id} onClick={() => handleSelect(store)}>
                  <strong>{store.name}</strong> — {store.city} ({store.zip})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Display selected store (optional in full mode) */}
      {!compact && selectedStore && (
        <div className='selected-store-banner'>
          Selected Store: <strong>{selectedStore.name}</strong> - {selectedStore.city}
          </div>
      )}
      </div>
  );
}
