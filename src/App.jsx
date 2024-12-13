import { BrowserRouter, Route, Routes } from "react-router";
import TransitionLayout from "./layouts/TransitionLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Private from "./routes/Private";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AdminProducts from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./components/OrderDetails";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<TransitionLayout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />

            <Route path="/shop" element={<Shop />} />
            <Route path="/account/:type?" element={<Account />} />
            <Route path="/product/:id" element={<Product />} />

            {/* Private Routes */}
            <Route element={<Private />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/ordersummary/:id" element={<OrderSummary />} />
            </Route>
          </Route>
        </Route>

        {/* Admin Routes*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route element={<TransitionLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products/:id" element={<Product />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
