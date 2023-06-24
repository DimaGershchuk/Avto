import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import AVATAR from "../../images/avatar.jpg";
import styles from "../../styles/Header.module.css";

const CarStatistics = () => {
    const [cars, setCars] = useState([]);
    const [popularBrands, setPopularBrands] = useState([]);
    const [brandCounts, setBrandCounts] = useState({});
    const [expensiveBrands, setExpensiveBrands] = useState([]);

    useEffect(() => {
        // Fetch the list of cars from the API
        axios.get('https://prettyprinted-flask-app-demo-ewf3.onrender.com/auto')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching car list', error);
            });
    }, []);

    useEffect(() => {
        // Calculate statistics
        calculateStatistics();
    }, [cars]);

    const calculateStatistics = () => {
        // Calculate the count of cars by brand
        const counts = {};
        cars.forEach(car => {
            if (counts[car.mark]) {
                counts[car.mark] += 1;
            } else {
                counts[car.mark] = 1;
            }
        });

        // Sort brands by count
        const sortedBrands = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

        // Get the top 10 popular brands
        const popularBrands = sortedBrands.slice(0, 10);

        // Calculate the average price for each brand
        const brandPrices = cars.reduce((accumulator, car) => {
            if (!accumulator[car.mark]) {
                accumulator[car.mark] = [];
            }
            accumulator[car.mark].push(car.price);
            return accumulator;
        }, {});

        const expensiveBrands = Object.keys(brandPrices)
            .map(brand => ({
                brand,
                averagePrice: brandPrices[brand].reduce((sum, price) => sum + price, 0) / brandPrices[brand].length,
            }))
            .sort((a, b) => b.averagePrice - a.averagePrice)
            .slice(0, 10);

        setPopularBrands(popularBrands);
        setBrandCounts(counts);
        setExpensiveBrands(expensiveBrands);
    };

    return (
        <div>
            <h2>Статистика автомобілів (Топ 10)</h2>

            <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: 1 }}>
                    <h3>Найпопулярніші марки:</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            <th style={{ padding: '20px',  borderBottom: '1px solid #ccc' }}>Марка</th>
                            <th style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>Кількість</th>
                        </tr>
                        </thead>
                        <tbody>
                        {popularBrands.map((brand, index) => (
                            <tr key={index}>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc', minWidth: '200px' }}>{brand}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{brandCounts[brand]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ flex: 1 }}>
                    <h3>Найдорожчі марки:</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Марка</th>
                            <th style={{ padding: '20px', borderBottom: '1px solid #ccc', whiteSpace: 'nowrap' }}>
                                Середня ціна
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {expensiveBrands.map((brand, index) => (
                            <tr key={index}>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc', minWidth: '200px' }}>{brand.brand}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                    {Math.round(brand.averagePrice).toLocaleString('en-US')} $
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );




};

export default CarStatistics;
