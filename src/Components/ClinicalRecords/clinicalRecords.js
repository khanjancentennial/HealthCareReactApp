import React, { useState, useEffect } from 'react';
import './clinicalRecords.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ClinicalRecord from '../../Model/ClinicalRecords_Model';
import Patient from '../../Model/Patients_Model';
import { useParams } from 'react-router-dom';

// import PatientDialog from '../Patients/patientsDialog';
// import PatientDeleteDialog from '../Patients/patientsDeleteDialog';

// import PatientUpdatedDialog from '../Patients/patientUpdateDialog';

function ClinicalRecords() {
  const { patientId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isUpdatedDialogOpen, setIsUpdatedDialogOpen] = useState(false);
//   const [selectedPatientId, setSelectedPatientId] = useState(null);
//   const [selectedPatientfirstName, setSelectedPatientFirstName] = useState(null);
//   const [selectedPatientLastName, setSelectedPatientLastName] = useState(null);
//   const [selectedPatientEmail, setSelectedPatientEmail] = useState(null);
//   const [selectedPatientPhoneNumber, setSelectedPatientPhoneNumber] = useState(null);
//   const [selectedPatientHeight, setSelectedPatientHeight] = useState(null);
//   const [selectedPatientWeight, setSelectedPatientWeight] = useState(null);
//   const [selectedPatientAddress, setSelectedPatientAddress] = useState(null);
//   const [selectedPatientGender, setSelectedPatientGender] = useState(null);
  const [allPatientData, setPatientData] = useState([]); // Global state variable to hold patient data


  const fetchData = async () => {
    try {
      const response = await axios.get('https://group3-mapd713.onrender.com/api/clinical-tests/clinical-tests');
      const patientData = response.data.data.map(patientRecords => new ClinicalRecord(
        patientRecords._id,
        new Patient(patientRecords.patient._id, patientRecords.patient.firstName, patientRecords.patient.lastName),
        patientRecords.bloodPressure,
        patientRecords.respiratoryRate,
        patientRecords.bloodOxygenLevel,
        patientRecords.heartbeatRate,
        patientRecords.chiefComplaint,
        patientRecords.pastMedicalHistory,
        patientRecords.medicalDiagnosis,
        patientRecords.medicalPrescription,
        patientRecords.creationDateTime,
        patientRecords.status,
        patientRecords.__v
      ));

      // Now perform the comparison
      for (var i = 0; i < patientData.length; i++) {
        if (patientData[i].patient.id === patientId) {
          console.log(`Match found for patient with id: ${patientId}`);
          // Perform any additional logic here if a match is found
          setPatientData(patientData);
          setData(patientData);
        } else {
          console.error('Patient data is not available for index:', i);
        }
      }

      
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    
    fetchData();
  }, [patientId]);

//   const handleEdit = (index) => {
//     console.log(index);
//     const patient = allPatientData[index];
//     console.log(patient);
//     if (patient) {
//       console.log(patient.id); // Should correctly log the ID
//       setSelectedPatientId(patient.id); // Assuming _id is the patient ID
//       setSelectedPatientFirstName(patient.firstName);
//       setSelectedPatientLastName(patient.lastName);
//       setSelectedPatientGender(patient.gender);
//       setSelectedPatientEmail(patient.email);
//       setSelectedPatientPhoneNumber(patient.phoneNumber);
//       setSelectedPatientHeight(patient.height);
//       setSelectedPatientWeight(patient.weight);
//       setSelectedPatientAddress(patient.address);
//       setIsUpdatedDialogOpen(true);
//     } else {
//       console.error('Patient data is not available for index:', index);
//     }
//   };

//   const handleDelete = (index) => {
//     console.log(index);
//     const patient = allPatientData[index];
//     console.log(patient);
//     if (patient) {
//       console.log(patient.id); // Should correctly log the ID
//       setSelectedPatientId(patient.id);// Assuming _id is the patient ID 
//       setIsDeleteDialogOpen(true);
//     } else {
//       console.error('Patient data is not available for index:', index);
//     }
//   };
  

//   const handleDialogOpen = () => {
//     setIsDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setIsDialogOpen(false);
//   };

//   const handleFormSubmit = (formData) => {
//     console.log('Form data submitted:', formData);
//     fetchData();
//     // Add the logic to submit the form data to the server here
//   };

//   const handleDeleteDialogClose = () => {
//     setIsDeleteDialogOpen(false);
//   };

//   const handleDeleteFormSubmit = () => {
//     // Refresh patient list or handle UI update here
//     console.log('Patient deleted');
//     fetchData();
//     // Optionally refetch patient list after deletion
//   };

//   const handleUpdatedDialogClose = () => {
//     setIsUpdatedDialogOpen(false);
//   };

//   const handleUpdatedFormSubmit = () => {
//     // Refresh patient list or handle UI update here
//     console.log('Patient Updated');
//     fetchData();
//     // Optionally refetch patient list after deletion
//   };

  return (
    <div>
      <div className="button-container">
        <button className="add-patient-button" ><FontAwesomeIcon icon={faAdd}/> Add New Record</button>
      </div>
      <center>Patient's All Records</center>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Blood Pressure</th>
              <th>Respiratory Rate</th>
              <th>Blood Oxygen Level</th>
              <th>Heartbeat Rate</th>
              <th>Chief Complaint</th>
              <th>Past Medical History</th>
              <th>Medical Diagnosis</th>
              <th>Medical Prescription</th>
              <th>creationDateTime</th>
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
                  <td>{item.bloodPressure}</td>
                  <td>{item.respiratoryRate}</td>
                  <td>{item.bloodOxygenLevel}</td>
                  <td>{item.heartbeatRate}</td>
                  <td>{item.chiefComplaint}</td>
                  <td>{item.pastMedicalHistory}</td>
                  <td>{item.medicalDiagnosis}</td>
                  <td>{item.medicalPrescription}</td>
                  <td>{item.creationDateTime}</td>
                  <td className={item.status === "critical" ? 'critical-text' : 'normal-text'}>{item.status}</td>
                  <td>
                    <button >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td>
                    <button >
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

      {/* <PatientDialog
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

      <PatientUpdatedDialog
        isOpen={isUpdatedDialogOpen}
        onClose={handleUpdatedDialogClose}
        onSubmit={handleUpdatedFormSubmit}
        patientId={selectedPatientId}
        firstName={selectedPatientfirstName}
        lastName={selectedPatientLastName}
        gender={selectedPatientGender}
        address={selectedPatientAddress}
        weight={selectedPatientWeight}
        height={selectedPatientHeight}
        email={selectedPatientEmail}
        phoneNumber={selectedPatientPhoneNumber}
      /> */}
    </div>
  );
}

export default ClinicalRecords;
