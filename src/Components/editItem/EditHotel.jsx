import { useState } from "react";
import styles from './EditHotel.module.css';

export const EditHotel = ({ hotel, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ ...hotel.properties });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...hotel, properties: { ...formData } });
    };

    return (
        <div className={styles.editHotelWrapper}>
            <form className={styles.editHotelForm} onSubmit={handleSubmit}>
                <h2>Edit Hotel</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.contact?.email || ""}
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
    );
};
