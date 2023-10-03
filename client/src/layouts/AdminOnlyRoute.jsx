import { Outlet } from "react-router-dom";
import NotAllowed from "../pages/NotAllowed";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

function AdminOnlyRoute() {
  const pb = useContext(PocketbaseContext);

  function isAuthenticated() {
    return pb.authStore.model
      ? (pb.authStore.isValid && pb.authStore.model.role === "user") ||
          (pb.authStore.model.role === "employer" &&
            pb.authStore.model.reviewed === true)
      : false;
  }

  function isEmployer() {
    return pb.authStore.model.role === "employer";
  }

  function isAdmin() {
    return pb.authStore.model.isAdmin;
  }

  return isAuthenticated() && isEmployer() && isAdmin() ? (
    <Outlet />
  ) : (
    <NotAllowed />
  );
}

export default AdminOnlyRoute;
