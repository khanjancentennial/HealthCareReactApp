import React, { useState, useEffect } from 'react';
import './patientClinicalDataDeleteDialog.css';
import axios from 'axios';

function PatientClinicalTestDeleteDialog({ isOpen, onClose, onSubmit, clinicalTestId }) {
  const [message, setMessage] = useState('');

  
  useEffect(() => {
    // Clear message when dialog is closed
    if (!isOpen) setMessage('');
  }, [isOpen]);

  const handleDelete = async () => {
    try {
      console.log(clinicalTestId)
      const response = await axios.delete(`https://group3-mapd713.onrender.com/api/clinical-tests/clinical-tests/${clinicalTestId}`);
      setMessage(response.data.message);
      onSubmit(); // Callback to refresh the patient list or handle UI update
      onClose();
    } catch (error) {
      console.error("There was an error deleting the CLinical Test!", error);
      setMessage('Error deleting Clinical Test');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this patient?</p>
        {message && (
          <div className="success-message">
            {message}
          </div>
        )}
        <div className="form-actions">
          <button className="confirm-button" onClick={handleDelete}>Yes</button>
          <button className="cancel-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default PatientClinicalTestDeleteDialog;
