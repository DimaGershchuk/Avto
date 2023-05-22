import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Product.module.css";
import AVATAR from "../../images/bmw.jpeg";

import { addItemToCart } from "../../features/user/userSlice";


const Product = (item) => {
  const { mark, price, color, model, description, year, engine } = item;

  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  // useEffect(() => {
  //   if (!images.length) return;

  //   setCurrentImage(images[0]);
  // }, [images]);

  const addToCart = () => {
    dispatch(addItemToCart(item));
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${AVATAR})` }}
        />
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
          <button
            onClick={addToCart}
            className={styles.add}
            disabled={!currentSize}
          >
            Add to cart
          </button>
          <button className={styles.favourite}>Add to favourites</button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>

          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
