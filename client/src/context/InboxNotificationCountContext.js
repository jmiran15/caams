import { createContext } from "react";

export const InboxNotificationCountContext = createContext({
  inboxNotifications: 0,
  setInboxNotifications: () => {},
});
