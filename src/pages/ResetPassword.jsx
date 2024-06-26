import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { randomString } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword === confirmPassword) {
            try {
                const response = await axios.post(`https://agr-backend-m85q.onrender.com/api/auth/resetpassword/${randomString}`, {password: newPassword });
                setSuccess(response.data.message);
            } catch (err) {
                setError("Failed to reset password");
            }
        } else {
            setError("Passwords do not match");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder='New Password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type='submit'>Submit</button>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
            </form>
        </div>
    )
}

export default ResetPassword;