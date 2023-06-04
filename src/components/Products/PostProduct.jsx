import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styles from "../../styles/PostProduct.css";

import { ROUTES } from "../../utils/routes";

const AddCarForm = () => {
    const [carData, setCarData] = useState({
      mark: "",
      model: "",
      year: "",
      price: "",
      engine: "",
      type_id : "",
      image : "",
      color : "",
      description: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCarData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          "https://prettyprinted-flask-app-demo-ewf3.onrender.com/auto",
          carData
        );
        console.log(res.data); // Відповідь сервера
        setCarData({
          mark: "",
          model: "",
          year: "",
          price: "",
          type_id : "",
          engine: "",
          color : "",
          image : "",
          description: "",
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <label className={styles.label}>
          Марка:
          <input className={styles.input}
            type="text"
            name="mark"
            value={carData.mark}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Категорія:
          <input
            type="number"
            name="type_id"
            value={carData.type_id}
            onChange={handleChange}
            required
          />
        </label>
  
        <label>
          Модель:
          <input
            type="text"
            name="model"
            value={carData.model}
            onChange={handleChange}
            required
          />
        </label>
  
        <label>
          Рік:
          <input
            type="number"
            name="year"
            value={carData.year}
            onChange={handleChange}
            required
          />
        </label>
  
        <label>
          Ціна:
          <input
            type="number"
            name="price"
            value={carData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Колір:
          <input
            type="text"
            name="color"
            value={carData.color}
            onChange={handleChange}
            required
          />
        </label>
  
        <label>
          Об'єм двигуна:
          <input
            type="text"
            name="engine"
            value={carData.engine}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Фото:
          <input
            type="text"
            name="image"
            value={carData.image}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Опис:
          <textarea
            name="description"
            value={carData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        
     
        <button type="submit">Додати</button>
      </form>
    );
  };
  
  export default AddCarForm;