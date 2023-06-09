import React from "react";
import { Link } from "react-router-dom";
import BMW from "../../images/catbmw.jpg";

import styles from "../../styles/Categories.module.css";

const Categories = ({ type, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  return (
    <section className={styles.section}>
      <h2>{type}</h2>

      <div className={styles.list}>
        {list.map(({ id, type_id, image, type, link }) => (
          <Link to={`/type/${id}`} key={id} className={styles.item}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
            />
            
            <h3 className={styles.title}>{type}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
