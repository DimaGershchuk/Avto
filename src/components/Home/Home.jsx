import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterByPrice } from "../../features/products/productsSlice";

import Categories from "../Categories/Categories";
import Poster from "../Poster/Poster";
import Products from "../Products/Products";

const Home = () => {
  
  const dispatch = useDispatch();
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);

  useEffect(() => {
    if (!list.length) return;

    dispatch(filterByPrice(2019));
  }, [dispatch, list.length]); 

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
       <Categories products={categories.list} amount={5} title="Worth seeing" />
    </>
  );
};

export default Home;
