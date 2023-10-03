import { Outlet } from "react-router-dom";
import NotAllowed from "../pages/NotAllowed";
import { useContext } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

function StudentOnlyRoute() {
  const pb = useContext(PocketbaseContext);

  function isUser() {
    return pb.authStore.model.role === "user";
  }

  return isUser() ? <Outlet /> : <NotAllowed />;
}

export default StudentOnlyRoute;
