import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default MainLayout;
