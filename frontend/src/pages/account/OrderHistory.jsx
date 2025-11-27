//frontend/src/pages/account/OrderHistory.jsx

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function OrderHistory() {
    const { orderHistory } = useContext(UserContext);

    return (
        <div>
            <h2> Order History</h2>

            {orderHistory.length === 0 &&
                <p> You have no past orders. </p>}

                {orderHistory?.map((order, i) => (
                    <div key={i} className="order-card">
                        <h4>Order #{order.orderNumber}</h4>
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        <p>Total: ${order.total.toFixed()}</p>

                        <ul>
                            {order.items.map((item, idx) => (
                                <li key={idx}>
                                    {item.qty} x {item.name} - ${item.price}
                                </li>
                            ))}
                        </ul>
                    </div>
    ))}
</div>
    );
}