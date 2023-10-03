import { useEffect } from "react";
import { Text, Button } from "@mantine/core";
import { openModal, closeAllModals } from "@mantine/modals";
import { isAuthenticated, logout } from "../helpers/pocketbase";

function WindowFocusHandler() {
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const onCloseHandler = () => {
    logout();
    closeAllModals();
  };

  const onFocus = () => {
    if (!isAuthenticated()) {
      openModal({
        onClose: onCloseHandler,
        withCloseButton: false,
        closeOnClickOutside: false,
        centered: true,
        closeOnEscape: false,
        trapFocus: true,
        lockScroll: true,
        title: "Your authentication token has expired!",
        children: (
          <>
            <Text>Please sign in again!</Text>
            <Button fullWidth onClick={onCloseHandler} mt="md">
              Okay!
            </Button>
          </>
        ),
      });
    }
  };

  return <></>;
}

export default WindowFocusHandler;
