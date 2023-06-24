import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Product.module.css";
import AVATAR from "../../images/bmw.jpeg";

import { addItemToCart } from "../../features/user/userSlice";

const Product = (item) => {
  const { mark, price, color, model, image, description, year, engine, auto_id } = item;

  const dispatch = useDispatch();
  const { cart, currentUser } = useSelector(({ user }) => user);
  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();
  const [showMessage, setShowMessage] = useState(false);

  const handleBuyCar = () => {
    if (currentUser) {
      const selectedAutoId = auto_id; // Обраний id автомобіля
      const url = `https://t.me/CarSe11erBot?start=${selectedAutoId}`;
      window.open(url, "_blank");
    } else {
      setShowMessage(true);
    }
  };

  const addToCart = () => {
    if (currentUser) {
      dispatch(addItemToCart(item));
    } else {
      setShowMessage(true);
    }
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div className={styles.current} style={{ backgroundImage: `url(${image})` }} />
        {/* <div className={styles["images-list"]}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div> */}
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{mark}</h1>
        <h1 className={styles.title}>{model}</h1>
        <div className={styles.price}>Ціна : {price}$</div>
        <div className={styles.price}>Рік випуску : {year}</div>
        <div className={styles.price}>Об'єм двигуна : {engine}</div>
        <div className={styles.price}>
          <span>Color:</span> {color}
        </div>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button onClick={addToCart} className={styles.add}>
            Додати до улюблених
          </button>
          <button className={styles.add} onClick={handleBuyCar}>
            Придбати авто
          </button>
        </div>

        {showMessage && !currentUser && (
          <div className={styles.message}>
            Ви не зареєстровані. Будь ласка,{" "}
            <Link to={ROUTES.LOGIN}>увійдіть</Link> або{" "}
            <Link to={ROUTES.REGISTER}>зареєструйтесь</Link>, щоб продовжити.
          </div>
        )}

        
      </div>
    </section>
  );
};

export default Product;
