import { Outlet } from "react-router-dom";
import NotAllowed from "../pages/NotAllowed";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

function InstructorOnlyRoute() {
  const pb = useContext(PocketbaseContext);

  function isEmployer() {
    return pb.authStore.model.role === "employer";
  }

  return isEmployer() ? <Outlet /> : <NotAllowed />;
}

export default InstructorOnlyRoute;
