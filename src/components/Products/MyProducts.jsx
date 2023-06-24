import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Product.module.css";
import { Link } from "react-router-dom";
import AVATAR from "../../images/avatar.jpg";

const Home = () => {
    const { currentUser, cart } = useSelector(({ user }) => user);
    const [values, setValues] = useState({ name: "Гість", avatar: AVATAR });

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
                        ({ auto_id, mark, year, model, id, engine, image, description, type_id, price }) => (
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
                                    <div className={styles.info}>
                                    <div className={styles.price}>Ціна : {price}$</div>
                                    <div className={styles.year}>Рік : {year}</div>
                                    <div className={styles.price}>Об'єм двигуна : {engine}</div>
                                    <div className={styles.description}>Опис : {description}</div>   
                                    </div>

                                    <div className={styles.buttons}>
                                        <button
                                            className={styles.add}
                                            onClick={() => handleEditCar(auto_id)}
                                        >
                                            Edit
                                        </button>
                                        <>⠀⠀⠀</>
                                        <button
                                            className={styles.add}
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
