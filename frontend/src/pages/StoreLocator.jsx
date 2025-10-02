//frontend/src/pages/StoreLocator.css

import React from 'react'
import { useState } from 'react';
import "./styles/StoreLocator.css";



export default function StoreLocator() {
    const [query, setQuery] = useState("");
    const [stores, setStores] = useState([]);

    const dummyStores = [
        { id: 1, name: "E-shop Downtown", city: "New York", zip: "10001" },
        { id: 2, name: "E-shop Uptown", city: "New York", zip: "10027" },
        { id: 3, name: "E-shop Central", city: "Chicago", zip: "60601" },
    ];

    function handleSearch(e) {
        e.preventDefault();
        const results = dummyStores.filter(
            s =>
            s.city.toLowerCase().includes(query.toLowerCase()) ||
            s.zip.includes(query)
        );
        setStores(results)
    }

  return (
    <div className='store-locator-page'>
        <h2>Find a Store Near You</h2>
        <form onSubmit={handleSearch} className="store-search-form">
            <input type="text"
            placeholder="Enter city or ZIP code..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>

        <div className='store-results'>
            {stores.length === 0 ? (
                <p className='no-results'>No Stores found yet.</p>
            ) : (
                <ul>
                    {stores.map(store => (
                        <li key={store.id}>
                            <strong>{store.name}</strong> - {store.city} ({store.zip})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
  )
}
