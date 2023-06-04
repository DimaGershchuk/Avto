import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/PostProduct.css";
import { BASE_URL } from "../../utils/constants";
const MailForm = () => {
  const [formData, setFormData] = useState({
    mark: "",
    model: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/send-email`, formData);
      console.log("Email sent successfully");
      // Додайте код для відображення підтвердження надсилання листа
    } catch (error) {
      console.error("Error sending email", error);
      // Додайте код для відображення помилки надсилання листа
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Mark:
        <input
          className={styles.input}
          type="text"
          name="mark"
          value={formData.mark}
          onChange={handleChange}
        />
      </label>
      <label>
        Model:
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Додати</button>
    </form>
  );
};

export default MailForm;