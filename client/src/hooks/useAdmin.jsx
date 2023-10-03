import { useContext, useEffect, useState } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function useAdmin() {
  const pb = useContext(PocketbaseContext);
  const user = pb.authStore.model;
  const [admin, setAdmin] = useState(undefined);

  useEffect(() => {
    if (!user.isAdmin && user.admin) {
      pb.collection("user")
        .getOne(user.admin)
        .then((admin) => setAdmin(admin))
        .catch((err) => console.log("error getting admin: ", err));
    }
  }, []);

  return admin;
}
