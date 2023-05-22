import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Products.module.css";

const Products = ({ mark, style = {}, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.products} style={style}>
      {mark && <h2>{mark}</h2>}

      <div className={styles.list}>
        {list.map(({auto_id, mark, model, id, type_id,  price }) => (
          <Link to={`/auto/${auto_id}`} key={auto_id} className={styles.product}>
             {/* <div
              className={styles.image}
              style={{ backgroundImage: `url(${image[0]})` }}
            /> */}

            <div className={styles.wrapper}>
              <h3 className={styles.title}>{mark}</h3>
              <h3 className={styles.title}>{model}</h3>
               <div className={styles.cat}>{type_id}</div>
              <div className={styles.info}>
                <div className={styles.prices}>
                  <div className={styles.price}>{price}$</div>
                  <div className={styles.oldPrice}>
                    {Math.floor(price * 0.8)}$
                  </div>
                </div>

                <div className={styles.purchases}>
                  {Math.floor(Math.random() * 20 + 1)} purchased
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
