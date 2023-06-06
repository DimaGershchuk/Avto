import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Products.module.css";
import { Link } from "react-router-dom";
import AVATAR from "../../images/avatar.jpg";

const Home = () => {
    const { currentUser, cart } = useSelector(({ user }) => user);
    const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });

    useEffect(() => {
        if (!currentUser) return;

        setValues(currentUser);
    }, [currentUser]);

    const dispatch = useDispatch();
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchUserCars = async () => {
            try {
                if (!currentUser) return;

                const response = await fetch(
                    `https://prettyprinted-flask-app-demo-ewf3.onrender.com/user/${currentUser.id}/auto`
                );
                const data = await response.json();
                setList(data);
            } catch (error) {
                console.error("Error fetching user cars:", error);
            }
        };

        fetchUserCars();
    }, [currentUser]);

    const categories = useSelector((state) => state.categories);

    const handleEditCar = (carId) => {
        // Обробник події редагування автомобіля
        console.log("Edit car with ID:", carId);
    };

    const handleDeleteCar = async (carId) => {
        try {
            const response = await fetch(
                `https://prettyprinted-flask-app-demo-ewf3.onrender.com/auto/${carId}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                // Видалення успішне, оновити список автомобілів
                const updatedList = list.filter((car) => car.auto_id !== carId);
                setList(updatedList);
            } else {
                console.error("Delete car request failed.");
            }
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <>
            <section className="Products_products__TMsTJ">
                <div className={styles.list}>
                    {list.map(
                        ({ auto_id, mark, model, id, image, type_id, price }) => (
                            <div key={auto_id} className={styles.product}>
                                <Link to={`/auto/${auto_id}`} className={styles.imageLink}>
                                    <div
                                        className={styles.image}
                                        style={{ backgroundImage: `url(${image})` }}
                                    />
                                </Link>

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

                                    <div className={styles.buttons}>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEditCar(auto_id)}
                                        >
                                            Edit
                                        </button>
                                        <>⠀⠀⠀</>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteCar(auto_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
