import React, { useState } from 'react';
import './contactus.css';

function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
        query: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, gender, email, phone, query } = formData;

        // Validation: Check if any field is empty
        if (!firstName || !lastName || !gender || !email || !phone || !query) {
            alert('Please fill in all the fields.');
            return;
        }

        const scriptURL = 'https://script.google.com/macros/s/AKfycbx3gahnui0_O33VWyXZF1exToRkC2mBE86FlmCnKVxbuQeJBN6QlzsPFbA5kET0aXyMpg/exec';

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(document.forms['submit-to-google-sheet'])
        })
        .then(response => {
            console.log('Success!', response);
            alert('Message sent successfully');
            setFormData({
                firstName: '',
                lastName: '',
                gender: '',
                email: '',
                phone: '',
                query: ''
            });
            window.location.href = '/'; // Redirect to the homepage or another page
        })
        .catch(error => console.error('Error!', error.message));
    };

    return (
        <div className="contact-form-container">
            <h1>Contact Us</h1>
            <form name="submit-to-google-sheet" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="query"
                    placeholder="Your Query"
                    value={formData.query}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;
