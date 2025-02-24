import { useState } from "react";
import styles from "./EditHotel.module.css";
import bg from "./bg.png";

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
    onSave({ ...hotel, properties: { ...formData } }); // Pass updated hotel data back to the parent component
  };

  // this function can be refactored to simplify the code
  const renderInput = (label, type, name, value) => (
    <label>
      {label}:
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={handleChange}
      />
    </label>
  );

  return (
    <div className={styles.editHotelWrapper}>
      <div className={styles.contentBox}>
        <div className={styles.imageContainer}>
          <img src={bg} alt="background" className={styles.hotelImage} />
        </div>
        <form className={styles.editHotelForm} onSubmit={handleSubmit}>
          <h2>Edit Hotel</h2>
          {/* use these functions to render inputs */}
          {renderInput("Name", "text", "name", formData.name)}
          {renderInput("Email", "email", "email", formData.contact?.email)}
          {renderInput("Phone No", "tel", "phone", formData.contact?.phone)}
          {renderInput(
            "Address",
            "text",
            "address_line2",
            formData.address_line2
          )}
          {renderInput("Website", "url", "website", formData.website)}
          <div className={styles.buttons}>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
