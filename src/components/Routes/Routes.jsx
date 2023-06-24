import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "../../utils/routes";

import Home from "../Home/Home";
import SingleProduct from "../Products/SingleProduct";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";
import PostProduct from "../Products/PostProduct";
import Statistic from "../Products/Statistic";
import MyProducts from "../Products/MyProducts";

const AppRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
    <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
    <Route path={ROUTES.CART} element={<Cart />} />
    <Route path={ROUTES.POSTAUTO} element={<PostProduct/>} />
    <Route path={ROUTES.STATS} element={<Statistic/>} />
    <Route path={ROUTES.MYPRODUCTS} element={<MyProducts/>} />
  </Routes>
);

export default AppRoutes;
