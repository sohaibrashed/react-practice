import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Private from "./routes/Private";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/account/:type?" element={<Account />} />
          <Route path="" element={<Private />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
