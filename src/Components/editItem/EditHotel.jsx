import { useState } from "react";
import styles from './EditHotel.module.css';
import bg from './bg.png';

export const EditHotel = ({ hotel, onSave, onCancel }) => {
    // Initialize formData state with the current hotel properties
    const [formData, setFormData] = useState({ ...hotel.properties });

    // Handle input changes and update formData state
    const handleChange = (e) => {
        const { name, value } = e.target;  // Get the name and value of the changed input
        setFormData((prevData) => ({
            ...prevData,   // Preserve previous formData
            [name]: value,  // Update the specific field with the new value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();   // Prevent page reload on form submission
        onSave({ ...hotel, properties: { ...formData } });   // Pass updated hotel data back to the parent component
    };

    return (
        <div className={styles.editHotelWrapper}>
            <div className={styles.contentBox}>
            {/* Background image section */}
            <div className={styles.imageContainer}>
                <img 
                    src={bg} 
                    alt="background" 
                    className={styles.hotelImage} 
                />
            </div>

            {/* Hotel edit form */}
            <form className={styles.editHotelForm} onSubmit={handleSubmit}>
                <h2>Edit Hotel</h2>

                {/* Input fields for editing hotel details */}
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ""}  // Pre-fill with existing data or empty string
                        onChange={handleChange}  // Update state when input changes
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.contact?.email || ""}   // Optional chaining to handle undefined values
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phone No:
                    <input
                        type="text"
                        name="phone"
                        value={formData.contact?.phone || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address_line2"
                        value={formData.address_line2 || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Website:
                    <input
                        type="url"
                        name="website"
                        value={formData.website || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Wifi Access:
                    <input
                        type="text"
                        name="wifi"
                        value={formData.wifi || ""}
                        onChange={handleChange}
                    />
                </label>

                <div className={styles.buttons}>
                    <button type="submit">Save</button> 
                    <button type="button" onClick={onCancel}>Cancel</button> 
                </div>
            </form>
            </div>
        </div>
    );
};
