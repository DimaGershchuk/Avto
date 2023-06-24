import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Cart.module.css";
import { sumBy } from "../../utils/common";
import { ROUTES } from "../../utils/routes";

const Cart = () => {
  const dispatch = useDispatch();
  const { currentUser, cart } = useSelector(({ user }) => user);
  const [showMessage, setShowMessage] = useState(false);

  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (auto_id) => {
    dispatch(removeItemFromCart(auto_id));
  };

  const handleBuyCar = () => {
    if (currentUser) {
      const autoIds = cart.map((item) => item.auto_id);
      const url = `https://t.me/CarSe11erBot?start=${autoIds.join(",")}`;
      window.open(url, "_blank");
    } else {
      setShowMessage(true);
    }
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Ваші улюблені</h2>

      {!cart.length ? (
        <div className={styles.empty}>Улюблених ще немає</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { mark, model, type_id, image, price, quantity, auto_id } = item;

              return (
                <div className={styles.item} key={auto_id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{mark}</h3>
                    <div className={styles.category}>{type_id}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>

                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity - 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                        />
                      </svg>
                    </div>

                    <span>{quantity}</span>

                    <div
                      className={styles.plus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity + 1))
                      }
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.total}>{price * quantity}$</div>

                  <div
                    className={styles.close}
                    onClick={() => removeItem(auto_id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.actions}>
            <div className={styles.total}>
              Загальна ціна:{" "}
              <span>
                {sumBy(cart.map(({ quantity, price }) => quantity * price))}$
              </span>
            </div>
            <button className={styles.proceed} onClick={handleBuyCar}>
              Придбати авто
            </button>
          </div>
        </>
      )}
      {showMessage && !currentUser && (
        <div className={styles.message}>
          Ви не зареєстровані. Будь ласка, <Link to={ROUTES.LOGIN}>увійдіть</Link> або{" "}
          <Link to={ROUTES.REGISTER}>зареєструйтесь</Link>, щоб продовжити.
        </div>
      )}
    </section>
  );
};

export default Cart;
