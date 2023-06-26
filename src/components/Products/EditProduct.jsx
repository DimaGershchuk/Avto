import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditCar = () => {
    const { id } = useParams();
    const [carData, setCarData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch(
                    `https://prettyprinted-flask-app-demo-ewf3.onrender.com/auto/${id}`
                );
                const data = await response.json();
                setCarData(data);
            } catch (error) {
                console.error("Error fetching car data:", error);
            }
        };

        fetchCarData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(
                `https://prettyprinted-flask-app-demo-ewf3.onrender.com/auto/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(carData),
                }
            );

            if (response.ok) {
                console.log("Car data updated successfully.");
                // Опціонально: оновити дані автомобіля у сторінці "Home"
                // dispatch(updateCarData(id, carData));
            } else {
                console.error("Update car data request failed.");
            }
        } catch (error) {
            console.error("Error updating car data:", error);
        }
    };

    return (
        <div>
            <h1>Edit Car</h1>
            <form>
                <label>
                    Mark:
                    <input
                        type="text"
                        name="mark"
                        value={carData.mark || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Model:
                    <input
                        type="text"
                        name="model"
                        value={carData.model || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Year:
                    <input
                        type="text"
                        name="year"
                        value={carData.year || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Engine:
                    <input
                        type="text"
                        name="engine"
                        value={carData.engine || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Color:
                    <input
                        type="text"
                        name="color"
                        value={carData.color || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Type ID:
                    <input
                        type="text"
                        name="type_id"
                        value={carData.type_id || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={carData.description || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="text"
                        name="price"
                        value={carData.price || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="button" onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </form>
        </div>
    );

};

export default EditCar;
