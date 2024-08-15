import React, { useState, useEffect } from 'react';
import './patients.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Patient from '../../Model/Patients_Model';

function Patients() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://group3-mapd713.onrender.com/patient/list');

        // Assuming the API response contains an array of patients
        const patientData = response.data.map(patient => new Patient(patient));
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
    console.log('Delete item at index:', index);
  };

  return (
    <div>
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
                  <td>{item.status}</td>
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
    </div>
  );
}

export default Patients;
