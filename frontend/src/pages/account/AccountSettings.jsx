//frontend/src/pages/account/AccountSettings.jsx

import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function AccountSettings() {
    const { user, updateEmail, updatePassword } = useContext(UserContext);
    const [email, setEmail] = useState(user.email);
    const [status, setStatus] = useState("");

    const handleEmailUpdate = async () => {
        const res = await updateEmail(email);
        setStatus(res.message);

    };

    const handlePasswordUpdate = async () => {
        const res = await updatePassword();
        setStatus(res.message);
    };

    return (
        <div className="account-section">
            <h2>Account Settigns</h2>

            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleEmailUpdate}>UpdateEmail</button>

            <label>Change Password</label>
            <button onClick={updatePassword}>Update Password</button>

            {status && <p className="status-msg">{status}</p>}
        </div>
    );
}