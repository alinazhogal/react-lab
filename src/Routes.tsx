import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes as DOMRoutes } from "react-router-dom";
import About from "./components/about";
import Cart from "./components/cart/cart";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Products from "./components/products/products";
import Profile from "./components/profile";
import { RootState } from "./redux";
import { getCart } from "./redux/actions/cartActions";
import pageLinks from "./routesLinks";

export default function Routes() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const login = useSelector((state: RootState) => state.auth.username);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth && !cart.length) {
      dispatch(getCart(login));
    }
  }, [isAuth, login]);

  return (
    <BrowserRouter>
      <Header />
      <DOMRoutes>
        <Route path={pageLinks.home} element={<Home />} />
        <Route path={pageLinks.products} element={isAuth ? <Products /> : <Navigate to={pageLinks.home} />}>
          <Route
            path={`${pageLinks.products}/:category`}
            element={isAuth ? <Products /> : <Navigate to={pageLinks.home} />}
          />
        </Route>
        <Route path={pageLinks.about} element={isAuth ? <About /> : <Navigate to={pageLinks.home} />} />
        <Route path={pageLinks.profile} element={isAuth ? <Profile /> : <Navigate to={pageLinks.home} />} />
        <Route path={pageLinks.cart} element={isAuth ? <Cart /> : <Navigate to={pageLinks.home} />} />
        <Route path="*" element={<Navigate to={pageLinks.home} />} />
      </DOMRoutes>
      <Footer />
    </BrowserRouter>
  );
}
