import { Text } from "@mantine/core";
import RecentMessage from "./RecentMessage";
import { useContext } from "react";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

function RecentMessages({
  selectedUser,
  recentUsers,
  updateSelectedUser,
  searchingUsers,
}) {
  const pb = useContext(PocketbaseContext);

  if (!recentUsers) {
    return (
      <>
        <Text>No recent messages.</Text>
      </>
    );
  }

  return (
    <>
      {searchingUsers ? (
        <>Should not be here, can delete this block</>
      ) : (
        recentUsers.map((m) => {
          return (
            <RecentMessage
              key={m.id}
              firstname={
                m.flag === "outgoing"
                  ? m.expand.to.firstName
                  : m.expand.from.firstName
              }
              lastname={
                m.flag === "outgoing"
                  ? m.expand.to.lastName
                  : m.expand.from.lastName
              }
              msg={m.message}
              read={m.from === pb.authStore.model.id ? true : m.read}
              onClick={() => {
                if (m.expand.to.id === selectedUser.id) {
                } else {
                  updateSelectedUser(
                    m.flag === "outgoing" ? m.expand.to : m.expand.from
                  );
                }
              }}
              selected={
                (m.flag === "incoming" &&
                  m.expand.from.id === selectedUser.id) ||
                (m.flag === "outgoing" && m.expand.to.id === selectedUser.id)
              }
            />
          );
        })
      )}
    </>
  );
}

export default RecentMessages;
