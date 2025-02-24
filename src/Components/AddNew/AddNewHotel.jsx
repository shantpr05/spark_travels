import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
import styles from "./AddNewHotel.module.css";

const AddNewHotel = ({ addHotel }) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "",
    address_line2: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHotel((prevState) => ({
      ...prevState,
      [name]: value,
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
        contact: { phone: newHotel.phone },
      },
    };
    addHotel(newMappedHotel);
    setIsSubmitted(true); // Hide the form and show the success message

    // Navigate to the homepage after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      {isSubmitted ? (
        // Show success message instead of the form
        <p className={styles.successMessage}>Successfully added hotel!</p>
      ) : (
        <>
          <h2>Register Hotel</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {["name", "address_line2", "city", "phone", "website"].map(
              (field, index) => (
                <div key={index} className={styles.inputGroup}>
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace("_", " ")}
                    {["name", "city", "phone"].includes(field) && (
                      <span style={{ color: "red" }}>*</span>
                    )}
                  </label>
                  <input
                    type={
                      field === "phone"
                        ? "tel"
                        : field === "website"
                        ? "url"
                        : "text"
                    }
                    id={field}
                    name={field}
                    value={newHotel[field]}
                    onChange={handleChange}
                    required={["name", "city", "phone"].includes(field)}
                    pattern={field === "phone" ? "[0-9]{10}" : undefined}
                    title={
                      field === "phone"
                        ? "Phone number must be 10 digits long"
                        : undefined
                    }
                    onKeyPress={
                      field === "phone"
                        ? (e) => !/[0-9]/.test(e.key) && e.preventDefault()
                        : undefined
                    }
                  />
                </div>
              )
            )}
            <button type="submit" className={styles.submitButton}>
              Add Hotel
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddNewHotel;
