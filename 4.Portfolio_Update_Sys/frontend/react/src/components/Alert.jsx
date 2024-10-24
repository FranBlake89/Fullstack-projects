import React, { useState } from 'react';

function Alert({ message, type = 'info' }) {
    const [showAlert, setShowAlert] = useState(true);

    const handleClose = () => {
    setShowAlert(false);
    };

    return (
    showAlert && (
        <div className={`alert alert-${type} text-center`}>
        <p>{message}</p>
        <button
            className="close"
            type="button"
            onClick={handleClose}
        >
            &times;
        </button>
        </div>
    )
    );
}

export default Alert;