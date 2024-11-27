import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function Private() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/account" replace />;
}
