import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Private from "./routes/Private";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Dashboard from "./pages/admin/Dashboard";
import Admin from "./routes/Admin";
import Products from "./pages/Products";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/admin/Users";
import AdminProducts from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import OrderDetails from "./components/OrderDetails";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import Categories from "./pages/admin/Categories";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/"
            index
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            index
            element={
              <PageTransition>
                <ContactUs />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            index
            element={
              <PageTransition>
                <AboutUs />
              </PageTransition>
            }
          />

          <Route
            path="/products/category/:type/:subCategory?"
            element={<Products />}
          />
          <Route path="/products/search/:keyword" element={<Products />} />

          {/* category?/:category?/:subcategory?/search?/:keyword?/page?/:pageNumber? */}

          <Route
            path="/account/:type?"
            element={
              <PageTransition>
                <Account />
              </PageTransition>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PageTransition>
                <Product />
              </PageTransition>
            }
          />

          <Route path="" element={<Private />}>
            <Route path="/profile" element={<Profile />} />

            <Route
              path="/checkout"
              index
              element={
                <PageTransition>
                  <Checkout />
                </PageTransition>
              }
            />
            <Route
              path="/ordersummary/:id"
              index
              element={
                <PageTransition>
                  <OrderSummary />
                </PageTransition>
              }
            />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<Admin />}>
            <Route path="dashboard" index element={<Dashboard />} />
            <Route
              path="users"
              element={
                <PageTransition>
                  <Users />
                </PageTransition>
              }
            />

            <Route
              path="products"
              element={
                <PageTransition>
                  <AdminProducts />
                </PageTransition>
              }
            />
            <Route
              path="categories"
              element={
                <PageTransition>
                  <Categories />
                </PageTransition>
              }
            />
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

export default App;
