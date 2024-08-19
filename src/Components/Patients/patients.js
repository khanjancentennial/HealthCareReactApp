import React, { useState, useEffect } from 'react';
import './patients.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Patient from '../../Model/Patients_Model';
import PatientDialog from '../Patients/patientsDialog';
import PatientDeleteDialog from '../Patients/patientsDeleteDialog';

function Patients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [allPatientData, setPatientData] = useState([]); // Global state variable to hold patient data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://group3-mapd713.onrender.com/patient/list');
        const patientData = response.data.data.map(patient => new Patient(patient));
        setPatientData(patientData);
        console.log(patientData);
        setData(patientData);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (index) => {
    console.log('Edit item at index:', index);
  };

  const handleDelete = (index) => {
    console.log(index);
    const patient = allPatientData[index];
    console.log(patient);
    if (patient) {
      console.log(patient.id); // Should correctly log the ID
      setSelectedPatientId(patient.id); // Assuming _id is the patient ID
      setIsDeleteDialogOpen(true);
    } else {
      console.error('Patient data is not available for index:', index);
    }
  };
  

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form data submitted:', formData);
    // Add the logic to submit the form data to the server here
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteFormSubmit = () => {
    // Refresh patient list or handle UI update here
    console.log('Patient deleted');
    // Optionally refetch patient list after deletion
  };

  return (
    <div>
      <div className="button-container">
        <button className="add-patient-button" onClick={handleDialogOpen}><FontAwesomeIcon icon={faAdd}/> Add New Patient</button>
      </div>
      <center>All Patients</center>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Address</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11">Loading data...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="11">Error loading data: {error}</td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.gender === 0 ? "Male" : "Female"}</td>
                  <td>{item.weight}</td>
                  <td>{item.height}</td>
                  <td>{item.address}</td>
                  <td className={item.status === "critical" ? 'critical-text' : 'normal-text'}>{item.status}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(index)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PatientDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
      />

      <PatientDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onSubmit={handleDeleteFormSubmit}
        patientId={selectedPatientId}
      />
    </div>
  );
}

export default Patients;
