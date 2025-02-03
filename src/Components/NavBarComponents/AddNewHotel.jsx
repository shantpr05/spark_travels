import React, { useState } from 'react';
import { v4 as uuid } from "uuid";  // Import uuid for generating unique IDs
import { useNavigate } from "react-router";  // Importing useNavigate for page redirection
import styles from './AddNewHotel.module.css';

const AddNewHotel = ({ addHotel }) => {
    let navigate = useNavigate();  // Initializing navigate hook for page redirection

    // Setting up initial state for the new hotel form
    const [newHotel, setNewHotel] = useState({
        name: '',
        address_line2: '',
        city: '',
        phone: '',
        website: '',
    });

    // Handle input change and update state dynamically
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewHotel(prevState => ({
            ...prevState,  // Spread the previous state
            [name]: value  // Update the specific field
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();   // Prevent page reload on form submit

        // Mapping form values to a structure that the `addHotel` function expects
        const newMappedHotel = {
            properties: {
                place_id: uuid(),  // Generate a unique ID using uuid
                name: newHotel.name,
                address_line2: newHotel.address_line2,
                categories: [
                    "accommodation",
                    "accommodation.hotel"
                ],
                city: newHotel.city,
                website: newHotel.website,
                contact: {phone: newHotel.phone}
            }
        }

        // Add the new hotel using the addHotel function passed as prop
        addHotel(newMappedHotel);

        // Reset the form after submission
        setNewHotel({
            name: '',
            address_line2: '',
            city: '',
            phone: '',
            website: '',
        });

        // Redirect the user back to the previous page
        navigate(-1);  // -1 navigates back in the history stack
    };

    return (
        <div className={styles.formContainer}>
            <h2>Add New Hotel</h2>
            <form id='save' onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Hotel Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newHotel.name}
                        onChange={handleChange}
                        required   // This field is mandatory
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="address_line2">Address Line 2</label>
                    <input
                        type="text"
                        id="address_line2"
                        name="address_line2"
                        value={newHotel.address_line2}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={newHotel.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={newHotel.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="website">Website</label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        value={newHotel.website}
                        onChange={handleChange}
                    />
                </div>
                <button form='save' type="submit" className={styles.submitButton}>Add Hotel</button>
            </form>
        </div>
    );
};

export default AddNewHotel;
