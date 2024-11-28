import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function Admin() {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !["admin", "owner"].includes(userInfo.role)) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
}
