//frontend/src/pages/account/AccountOverview.jsx

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";

export default function Overview() {
    const { user } = useContext(UserContext);
    const { selectedStore } = useCart();

    return (
        <div className="account-section">
            <h2> Welcome Back</h2>
            <p><strong>Email:</strong>{user?.email}</p>
            <p>
                <strong>Last Login:</strong>{" "}
                {user?.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                : "N/A"}
            </p>

            <h3>Preferred Store</h3>
            {selectedStore ? (
            <p>
                {selectedStore.name} - {selectedStore.city} {selectedStore.zip}

            </p>
            ) : (
                <p> No store selected.</p>
            )}
        </div>
    );
}