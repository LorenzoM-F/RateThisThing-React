import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Error.css'; // Ensure this CSS file is created and imported

function Error({ message }) {
    const navigate = useNavigate();

    const handleOkClick = () => {
        navigate('/');
    };

    return (
        <div className="error-container">
            <div className="error-icon">✘</div> {/* X character */}
            <p className="error-message">{message}</p>
            <button className="ok-button" onClick={handleOkClick}>OK</button>
        </div>
    );
}

export default Error;
