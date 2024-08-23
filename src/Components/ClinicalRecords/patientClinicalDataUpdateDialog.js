import React, { useState, useEffect } from 'react';
import '../ClinicalRecords/patientClinicalDataUpdateDialog.css';
import axios from 'axios';

function PatientUpdateDialog({ isOpen, onClose, onSubmit, patientId, bloodPressure, respiratoryRate, 
  bloodOxygenLevel, heartbeatRate, chiefComplaint, pastMedicalHistory,  medicalDiagnosis, medicalPrescription, clinicalTestId }) {

    const now = new Date();
  
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');

  const [formData, setFormData] = useState({
    bloodPressure: '',
    respiratoryRate: '',
    bloodOxygenLevel: '',
    heartbeatRate: '',
    chiefComplaint: '',
    pastMedicalHistory: '',
    medicalDiagnosis: '',
    medicalPrescription: '',
    creationDateTime: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`,
    patientId: patientId,
  });

  const [formErrors, setFormErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  // Populate the form data when the dialog opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        bloodPressure: bloodPressure || '',
        respiratoryRate: respiratoryRate || '',
        bloodOxygenLevel: bloodOxygenLevel || '',
        heartbeatRate: heartbeatRate || '',
        chiefComplaint: chiefComplaint || '',
        pastMedicalHistory: pastMedicalHistory || '',
        medicalDiagnosis: medicalDiagnosis || '',
        medicalPrescription : medicalPrescription || '',
      });
    }
  }, [isOpen, bloodPressure, respiratoryRate, bloodOxygenLevel, heartbeatRate, chiefComplaint, pastMedicalHistory, medicalDiagnosis, medicalPrescription]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.bloodPressure || isNaN(formData.bloodPressure) || formData.bloodPressure <= 0) errors.bloodPressure = 'Blood Pressure is required';
    if (!formData.respiratoryRate || isNaN(formData.respiratoryRate) || formData.respiratoryRate <= 0) errors.respiratoryRate = 'Respiratory Rate is required';
    if (!formData.bloodOxygenLevel || isNaN(formData.bloodOxygenLevel) || formData.bloodOxygenLevel <= 0) errors.bloodOxygenLevel = 'Blood Oxygen Level is required';
    if (!formData.heartbeatRate || isNaN(formData.heartbeatRate) || formData.heartbeatRate <= 0) errors.heartbeatRate = 'Heartbeat Rate Rate is required';
    if (!formData.chiefComplaint) errors.chiefComplaint = 'Chief Complaint is required';
    if (!formData.pastMedicalHistory) errors.pastMedicalHistory = 'past Medical History is required';
    if (!formData.medicalDiagnosis) errors.medicalDiagnosis = 'Medical Diagnosis is required';
    if (!formData.medicalPrescription) errors.medicalPrescription = 'Medical Prescription is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(`https://group3-mapd713.onrender.com/api/clinical-tests/clinical-tests/${clinicalTestId}`, {
          ...formData,
          
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setToastMessage(response.data.message); // Assuming the API response contains a `message` field
        onSubmit(formData);
        onClose();
      } catch (error) {
        console.error("There was an error while updating the patient details!", error);
      }
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Clean up timeout on component unmount
    }
  }, [toastMessage]);

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Update CLinicat Test Details</h2>
        {toastMessage && (
          <div className="toast-message">
            {toastMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
        <div className="form-group">
            <label>Blood Pressure</label>
            <input
              type="number"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              min="1"
            />
            {formErrors.bloodPressure && <p className="error-text">{formErrors.bloodPressure}</p>}
          </div>
          <div className="form-group">
            <label>Respiratory Rate</label>
            <input
              type="number"
              name="respiratoryRate"
              value={formData.respiratoryRate}
              onChange={handleInputChange}
              min="1"
            />
            {formErrors.respiratoryRate && <p className="error-text">{formErrors.respiratoryRate}</p>}
          </div>
          <div className="form-group">
            <label>Blood Oxygen Level</label>
            <input
              type="number"
              name="bloodOxygenLevel"
              value={formData.bloodOxygenLevel}
              onChange={handleInputChange}
              min="1"
            />
            {formErrors.bloodOxygenLevel && <p className="error-text">{formErrors.bloodOxygenLevel}</p>}
          </div>
          <div className="form-group">
            <label>Heartbeat Rate</label>
            <input
              type="number"
              name="heartbeatRate"
              value={formData.heartbeatRate}
              onChange={handleInputChange}
              min="1"
            />
            {formErrors.heartbeatRate && <p className="error-text">{formErrors.heartbeatRate}</p>}
          </div>

          <div className="form-group">
            <label>Chief Complaint</label>
            <input
              type="text"
              name="chiefComplaint"
              value={formData.chiefComplaint}
              onChange={handleInputChange}
            />
            {formErrors.chiefComplaint && <p className="error-text">{formErrors.chiefComplaint}</p>}
          </div>
          <div className="form-group">
            <label>PastMedical History</label>
            <input
              type="text"
              name="pastMedicalHistory"
              value={formData.pastMedicalHistory}
              onChange={handleInputChange}
            />
            {formErrors.pastMedicalHistory && <p className="error-text">{formErrors.pastMedicalHistory}</p>}
          </div>
          <div className="form-group">
            <label>Medical Diagnosis</label>
            <input
              type="text"
              name="medicalDiagnosis"
              value={formData.medicalDiagnosis}
              onChange={handleInputChange}
            />
            {formErrors.medicalDiagnosis && <p className="error-text">{formErrors.medicalDiagnosis}</p>}
          </div>
          <div className="form-group">
            <label>Medical Prescription</label>
            <input
              type="text"
              name="medicalPrescription"
              value={formData.medicalPrescription}
              onChange={handleInputChange}
            />
            {formErrors.medicalPrescription && <p className="error-text">{formErrors.medicalPrescription}</p>}
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Update Clinical Test Details</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientUpdateDialog;
