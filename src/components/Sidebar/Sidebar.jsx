import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "../../styles/Sidebar.module.css";

const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories);

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>Категорії</div>
      <nav>
        <ul className={styles.menu}>
          {list.map(({ id, type }) => (
            <li key={id}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                to={`/type/${id}`}
              >
                {type}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      
    </section>
  );
};

export default Sidebar;
