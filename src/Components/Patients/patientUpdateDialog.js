import React, { useState, useEffect } from 'react';
import '../Patients/patientUpdateDialog.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PatientUpdateDialog({ isOpen, onClose, onSubmit, patientId, firstName, lastName, height, weight, gender, email, phoneNumber, address }) {
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    height: height,
    weight: weight,
    gender: gender,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
  });

  const [formErrors, setFormErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.height || isNaN(formData.height) || formData.height <= 0) errors.height = 'Valid height is required';
    if (!formData.weight || isNaN(formData.weight) || formData.weight <= 0) errors.weight = 'Valid weight is required';
    if (!formData.gender) errors.gender = 'Gender is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) errors.phoneNumber = 'Phone number must be 10 digits long';
    if (!formData.address) errors.address = 'Address is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(`https://group3-mapd713.onrender.com/patient/patients/${patientId}`, {
          ...formData,
          gender: Number(formData.gender),
          phoneNumber: formData.phoneNumber.replace(/-/g, ''),
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
        <h2>Update Patient Details</h2>
        {toastMessage && (
          <div className="toast-message">
            {toastMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {formErrors.firstName && <p className="error-text">{formErrors.firstName}</p>}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {formErrors.lastName && <p className="error-text">{formErrors.lastName}</p>}
          </div>
          
          <div className="form-group">
            <label>Height</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              min="1"
            />
            {formErrors.height && <p className="error-text">{formErrors.height}</p>}
          </div>
          <div className="form-group">
            <label>Weight</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              min="1"
            />
            {formErrors.weight && <p className="error-text">{formErrors.weight}</p>}
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
            {formErrors.gender && <p className="error-text">{formErrors.gender}</p>}
          </div>
          <div className="form-group">
            <label>Email ID</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <p className="error-text">{formErrors.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              maxLength="10"
              minLength="10"
            />
            {formErrors.phoneNumber && <p className="error-text">{formErrors.phoneNumber}</p>}
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {formErrors.address && <p className="error-text">{formErrors.address}</p>}
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Add Patient</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientUpdateDialog;
