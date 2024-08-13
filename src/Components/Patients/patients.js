import React from 'react';
import './patients.css'

function Patients() {
    // Example data for the table
  const data = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', gender: 'Male' },
    { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '123-456-7891', gender: 'Female' },
    { firstName: 'Jim', lastName: 'Beam', email: 'jim.beam@example.com', phone: '123-456-7892', gender: 'Male' },
    { firstName: 'Jack', lastName: 'Daniels', email: 'jack.daniels@example.com', phone: '123-456-7893', gender: 'Male' },
    { firstName: 'Jill', lastName: 'Valentine', email: 'jill.valentine@example.com', phone: '123-456-7894', gender: 'Female' },
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', gender: 'Male' },
    { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '123-456-7891', gender: 'Female' },
    { firstName: 'Jim', lastName: 'Beam', email: 'jim.beam@example.com', phone: '123-456-7892', gender: 'Male' },
    { firstName: 'Jack', lastName: 'Daniels', email: 'jack.daniels@example.com', phone: '123-456-7893', gender: 'Male' },
    { firstName: 'Jill', lastName: 'Valentine', email: 'jill.valentine@example.com', phone: '123-456-7894', gender: 'Female' },
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', gender: 'Male' },
    { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '123-456-7891', gender: 'Female' },
    { firstName: 'Jim', lastName: 'Beam', email: 'jim.beam@example.com', phone: '123-456-7892', gender: 'Male' },
    { firstName: 'Jack', lastName: 'Daniels', email: 'jack.daniels@example.com', phone: '123-456-7893', gender: 'Male' },
    { firstName: 'Jill', lastName: 'Valentine', email: 'jill.valentine@example.com', phone: '123-456-7894', gender: 'Female' },
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', gender: 'Male' },
    { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '123-456-7891', gender: 'Female' },
    { firstName: 'Jim', lastName: 'Beam', email: 'jim.beam@example.com', phone: '123-456-7892', gender: 'Male' },
    { firstName: 'Jack', lastName: 'Daniels', email: 'jack.daniels@example.com', phone: '123-456-7893', gender: 'Male' },
    { firstName: 'Jill', lastName: 'Valentine', email: 'jill.valentine@example.com', phone: '123-456-7894', gender: 'Female' },
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', gender: 'Male' },
    { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '123-456-7891', gender: 'Female' },
    { firstName: 'Jim', lastName: 'Beam', email: 'jim.beam@example.com', phone: '123-456-7892', gender: 'Male' },
    { firstName: 'Jack', lastName: 'Daniels', email: 'jack.daniels@example.com', phone: '123-456-7893', gender: 'Male' },
    { firstName: 'Jill', lastName: 'Valentine', email: 'jill.valentine@example.com', phone: '123-456-7894', gender: 'Female' },
  ];

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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.gender}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>;
}

export default Patients;