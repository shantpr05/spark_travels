// AddNewHotel.jsx
import React, { useState } from 'react';
import styles from './AddNewHotel.module.css';

const AddNewHotel = ({ addHotel }) => {
    const [newHotel, setNewHotel] = useState({
        name: '',
        address_line2: '',
        city: '',
        phone: '',
        website: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewHotel(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the addHotel function passed as a prop to save the new hotel
        addHotel(newHotel);
        // Reset the form after submission
        setNewHotel({
            name: '',
            address_line2: '',
            city: '',
            phone: '',
            website: '',
        });
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
                        required
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
                <button form='save' type="submit" className={styles.submitButton}>Save Hotel</button>
            </form>
        </div>
    );
};

export default AddNewHotel;
