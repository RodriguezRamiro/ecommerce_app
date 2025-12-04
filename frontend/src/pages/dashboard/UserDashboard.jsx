//frontend/src/pages/dashboard/UserDashboard.jsx

import { useState } from "react";
import Overview from "../account/Overview";
import OrderHistory from "../account/OrderHistory";
import AccountSettings from "../account/AccountSettings";


const UserDashboard = () => {
    const [section, setSection] = useState("overview");

    const renderSection = () => {
        switch (section) {
            case "orders":
                return <OrderHistory />;
            case "settings":
                return <AccountSettings />;
            default:
                return <Overview />
        }
    };

  return (
    <div className="user-dashboard">
        {/* Tabs */}
        <nav className="dashboard-tabs">
            <button className={section === "overview" ? "tab active" : "tab"}
            onClick={() => setSection("overview")}
            >
            OverView
            </button>

            <button className={section === "orders" ? "tab active" : "tab"}
            onClick={() => setSection("orders")}
            >
            Orders
            </button>

            <button className={section === "settings" ? "tab active" : "tab"}
            onClick={() => setSection("settings")}
            >
            Settings
            </button>
        </nav>

        {/* CONTENT */}
        <main className="dashboard-content">
            {renderSection()}
        </main>
        </div>
  );
}

export default UserDashboard;
