import React from 'react';
import './patients.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Patients() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://group3-mapd713.onrender.com/patient/list')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);  

  const handleEdit = (index) => {
    console.log('Edit item at index:', index);
  };

  const handleDelete = (index) => {
    console.log('Delete item at index:', index);
  };

  return <div>
 
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
          {
          data.length > 0 ? (
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
          )))
          :
          (
            <tr>
              <td colSpan="7">Loading data...</td>
            </tr>
          )
        
        }
        </tbody>
      </table>
    </div>
  </div>;
}

export default Patients;