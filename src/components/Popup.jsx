import React, { useState } from "react";

const Popup = ({ role }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button onClick={togglePopup}>View Details</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{role.name}</h2>
            <p>{role.description}</p>
            <button onClick={togglePopup}>Exit</button>
            <button>Confirm</button>    
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;