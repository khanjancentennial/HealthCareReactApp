import React, { useState, useEffect } from 'react';
import './clinicalRecords.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ClinicalRecord from '../../Model/ClinicalRecords_Model';
// import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import PatientClinicalDataAddDialog from '../ClinicalRecords/patientClinicalDataAddDialog';
import PatientClinicalTestDeleteDialog from '../ClinicalRecords/patientClinicalDataDeleteDialog';

import PatientClinicalTestUpdatedDialog from '../ClinicalRecords/patientClinicalDataUpdateDialog';


// Define the Patient class
class Patient {
    constructor(id, firstName, lastName) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }

function ClinicalRecords() {
//   const { patientId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const location = useLocation();
  const { patientId, firstName, lastName } = location.state || {}; // Use optional chaining
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdatedDialogOpen, setIsUpdatedDialogOpen] = useState(false);
  const [selectedClinicalTestId, setSelectedClinicalTestId] = useState(null);

  const [selectedPatientBloodPressure, setSelectedPatientbloodPressure] = useState(null);
  const [selectedPatientRespiratoryRate, setSelectedPatientrespiratoryRate] = useState(null);
  const [selectedPatientBloodOxygenLevel, setSelectedPatientbloodOxygenLevel] = useState(null);
  const [selectedPatientHeartbeatRate, setSelectedPatientheartbeatRate] = useState(null);
  const [selectedPatientChiefComplaint, setSelectedPatientchiefComplaint] = useState(null);
  const [selectedPatientPastMedicalHistory, setSelectedPatientpastMedicalHistory] = useState(null);
  const [selectedPatientMedicalDiagnosis, setSelectedPatientmedicalDiagnosis] = useState(null);
  const [selectedPatientMedicalPrescription, setSelectedPatientmedicalPrescription] = useState(null);
  const [allPatientData, setPatientData] = useState([]); // Global state variable to hold patient data


  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    
    const pad = (num) => num.toString().padStart(2, '0');
  
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
  
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const formattedTime = `${hours}:${minutes}:${seconds}`;
  
    return {
      date: formattedDate,
      time: formattedTime
    };
  };



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

      // Filter the data for the records matching the patientId
    const matchingRecords = patientData.filter(record => record.patient.id === patientId);

    if (matchingRecords.length > 0) {
      console.log(`Found ${matchingRecords.length} matching records for patient with id: ${patientId}`);
      // Update state with the filtered data
      // Format creationDateTime for each record
      const formattedRecords = matchingRecords.map(record => ({
        ...record,
        formattedCreationDate: formatDateTime(record.creationDateTime)
      }));
      setPatientData(formattedRecords);
      setData(formattedRecords);
    } else {
      console.error(`No records found for patient with id: ${patientId}`);
    }

    //   // Now perform the comparison
    //   for (var i = 0; i < patientData.length; i++) {
    //     if (patientData[i].patient.id === patientId) {
    //       console.log(`Match found for patient with id: ${patientId}`);
    //       // Perform any additional logic here if a match is found
    //       setPatientData(patientData);
    //       setData(patientData);
    //       console.log(patientData);
    //     } else {
    //       console.error('Patient data is not available for index:', i);
    //     }
    //   }

      
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    
    fetchData();
  }, [patientId]);

  const handleEdit = (index) => {
    console.log(index);
    const clinicalTest = allPatientData[index];
    console.log(clinicalTest);
    if (clinicalTest) {
      console.log(clinicalTest.id); // Should correctly log the ID
      setSelectedClinicalTestId(clinicalTest.id); 
      setSelectedPatientbloodPressure(clinicalTest.bloodPressure);
      setSelectedPatientrespiratoryRate(clinicalTest.respiratoryRate);
      setSelectedPatientbloodOxygenLevel(clinicalTest.bloodOxygenLevel);
      setSelectedPatientheartbeatRate(clinicalTest.heartbeatRate);
      setSelectedPatientchiefComplaint(clinicalTest.chiefComplaint);
      setSelectedPatientpastMedicalHistory(clinicalTest.pastMedicalHistory);
      setSelectedPatientmedicalDiagnosis(clinicalTest.medicalDiagnosis);
      setSelectedPatientmedicalPrescription(clinicalTest.medicalPrescription);
      setIsUpdatedDialogOpen(true);
    } else {
      console.error('Patient data is not available for index:', index);
    }
  };

  const handleDelete = (index) => {
    console.log(index);
    const ClinicalRecord = allPatientData[index];
    console.log(ClinicalRecord);
    if (ClinicalRecord) {
      console.log(ClinicalRecord.id); // Should correctly log the ID
      setSelectedClinicalTestId(ClinicalRecord.id);// Assuming _id is the patient ID 
      setIsDeleteDialogOpen(true);
    } else {
      console.error('Clinical test data is not available for index:', index);
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
    fetchData();
    // Add the logic to submit the form data to the server here
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteFormSubmit = () => {
    // Refresh patient list or handle UI update here
    console.log('Clinical test deleted');
    fetchData();
    // Optionally refetch patient list after deletion
  };

  const handleUpdatedDialogClose = () => {
    setIsUpdatedDialogOpen(false);
  };

  const handleUpdatedFormSubmit = () => {
    // Refresh patient list or handle UI update here
    console.log('Patient Updated');
    fetchData();
    // Optionally refetch patient list after deletion
  };

  return (
    <div>
      <div className="button-container">
        <button className="add-patient-button" onClick={handleDialogOpen}><FontAwesomeIcon icon={faAdd}/> Add New Record</button>
      </div>
      <center>Patient's All Records</center>
      <div className="table-container">
        <div>
            
            <h3>Patient First Name :- {firstName}</h3> 
            <h3>Patient Last Name :- {lastName}</h3> 
                   
        </div>
        
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
              <th>Clinical Test Date</th>
              <th>Clinical Test Time</th>
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
                  <td>{item.formattedCreationDate.date}</td>
                  <td>{item.formattedCreationDate.time}</td>
                  <td className={item.status === "critical" ? 'critical-text' : 'normal-text'}>{item.status}</td>
                  <td>
                    <button >
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

      <PatientClinicalDataAddDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
        patientId={patientId}
      />

      <PatientClinicalTestDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onSubmit={handleDeleteFormSubmit}
        ClinicalTestId={selectedClinicalTestId}
      />

      <PatientUpdatedDialog
        isOpen={isUpdatedDialogOpen}
        onClose={handleUpdatedDialogClose}
        onSubmit={handleUpdatedFormSubmit}
        patientId={patientId}
        bloodPressure={selectedPatientBloodPressure}
        respiratoryRate={selectedPatientRespiratoryRate}
        bloodOxygenLevel={selectedPatientBloodOxygenLevel}
        heartbeatRate={selectedPatientHeartbeatRate}
        chiefComplaint={selectedPatientChiefComplaint}
        pastMedicalHistory={selectedPatientPastMedicalHistory}
        medicalDiagnosis={selectedPatientMedicalDiagnosis}
        medicalPrescription={selectedPatientMedicalPrescription}
        clinicalTestId = {selectedClinicalTestId}
      />
    </div>
  );
}

export default ClinicalRecords;
