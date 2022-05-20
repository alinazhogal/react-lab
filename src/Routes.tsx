import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes as DOMRoutes } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Loader from "./elements/loader";

import { RootState } from "./redux";
import { getUser } from "./redux/actions/authActions";
import { getCart } from "./redux/actions/cartActions";
import pageLinks from "./routesLinks";

const Products = lazy(() => import("./components/products/products"));
const Profile = lazy(() => import("./components/profile/profile"));
const Cart = lazy(() => import("./components/cart/cart"));
const About = lazy(() => import("./components/about"));

export default function Routes() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const login = useSelector((state: RootState) => state.auth.username);
  const role = useSelector((state: RootState) => state.auth.role);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth && !cart.length) {
      dispatch(getCart(login));
    }
    if (isAuth && !role) {
      dispatch(getUser(login));
    }
  }, [isAuth, login]);

  return (
    <BrowserRouter>
      <Header />
      <DOMRoutes>
        <Route path={pageLinks.home} element={<Home />} />
        <Route
          path={pageLinks.products}
          element={
            isAuth ? (
              <React.Suspense fallback={<Loader />}>
                <Products />
              </React.Suspense>
            ) : (
              <Navigate to={pageLinks.home} />
            )
          }
        >
          <Route
            path={`${pageLinks.products}/:category`}
            element={
              isAuth ? (
                <React.Suspense fallback={<Loader />}>
                  <Products />
                </React.Suspense>
              ) : (
                <Navigate to={pageLinks.home} />
              )
            }
          />
        </Route>
        <Route
          path={pageLinks.about}
          element={
            isAuth ? (
              <React.Suspense fallback={<Loader />}>
                <About />
              </React.Suspense>
            ) : (
              <Navigate to={pageLinks.home} />
            )
          }
        />
        <Route
          path={pageLinks.profile}
          element={
            isAuth ? (
              <React.Suspense fallback={<Loader />}>
                <Profile />
              </React.Suspense>
            ) : (
              <Navigate to={pageLinks.home} />
            )
          }
        />
        <Route
          path={pageLinks.cart}
          element={
            isAuth ? (
              <React.Suspense fallback={<Loader />}>
                <Cart />
              </React.Suspense>
            ) : (
              <Navigate to={pageLinks.home} />
            )
          }
        />
        <Route path="*" element={<Navigate to={pageLinks.home} />} />
      </DOMRoutes>
      <Footer />
    </BrowserRouter>
  );
}
