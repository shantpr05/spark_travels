import React, { useState } from 'react';
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
import styles from './AddNewHotel.module.css';

const AddNewHotel = ({ addHotel }) => {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission
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

        const newMappedHotel = {
            properties: {
                place_id: uuid(),
                name: newHotel.name,
                address_line2: newHotel.address_line2,
                categories: ["accommodation", "accommodation.hotel"],
                city: newHotel.city,
                website: newHotel.website,
                contact: { phone: newHotel.phone }
            }
        };

        addHotel(newMappedHotel);
        setIsSubmitted(true); // Hide the form and show the success message

        // Navigate to the homepage after 2 seconds
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className={styles.formContainer}>
            {isSubmitted ? (
                // Show success message instead of the form
                <p className={styles.successMessage}>Successfully added hotel!</p>
            ) : (
                <>
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
                        <button form='save' type="submit" className={styles.submitButton}>Add Hotel</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default AddNewHotel;
