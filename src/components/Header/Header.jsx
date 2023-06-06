import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Header.module.css";

import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";

import BMW from "../../images/catbmw.jpg";

import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";


const Header = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const {currentUser, cart} = useSelector(({user}) => user)

  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });

  const { data, isLoading } = useGetProductsQuery({ model: searchValue })

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if(!currentUser) dispatch(toggleForm(true))
  }
  
  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>
      <Link to = {ROUTES.POSTAUTO}>
      <button className={styles.button}>
             Додати оголошення
           </button>
           </Link>
           {/* <Link to = {ROUTES.MAILFORM}>
            <button className={styles.button}>Register</button>
          </Link> */}
        <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
       <div className={styles.avatar} style={{ backgroundImage: `url(${values.avatar})` }} />
       <div className={styles.username}>{values.name}</div>
        </div> 
        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </div>

         

          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anyting..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}  
            />
             {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? "Loading"
                : !data.length
                ? "No results"
                : data.map(({ mark, model, price, image, auto_id,id}) => {
                    return (
                      <Link
                        key={auto_id}
                        onClick={() => setSearchValue("")}
                        className={styles.item}
                        to={`/auto/${auto_id}`}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${image})` }}
                        />
                        <div className={styles.title}>{mark}</div>
                         <div className={styles.title}>{model}</div>
                      </Link>
                    );
                  })}
            </div>
            
          )}
          </div>
          </form>
          <div className={styles.account}>
          {/* <Link to={ROUTES.HOME} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link> */}
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>
        </div>
        </div>
        </div>
        
        
  
         
  );
};

export default Header;
