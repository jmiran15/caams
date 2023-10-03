import { Outlet, Navigate } from "react-router-dom";
import WindowFocusHandler from "../components/WindowFocusHandler";
import { PocketbaseContext } from "../context/PocketbaseContext";
import { useContext } from "react";

function ProtectedRoute() {
  const pb = useContext(PocketbaseContext);

  return (
    pb.authStore.model
      ? (pb.authStore.isValid && pb.authStore.model.role === "user") ||
        (pb.authStore.model.role === "employer" &&
          pb.authStore.model.reviewed === true)
      : false
  ) ? (
    <>
      <WindowFocusHandler />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

export default ProtectedRoute;
