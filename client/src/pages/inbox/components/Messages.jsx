import { useContext } from "react";
import { ScrollArea, Loader } from "@mantine/core";
import Message from "./Message";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

function Messages({ messages, messagesLoading, maxHeight }) {
  const pb = useContext(PocketbaseContext);

  //TODO: get messages for user and receiver
  //TODO: map over messages a display them

  //TODO: Update how state is passed so that pages updates correctly
  //TOOD: implemment live subscription to messages to updatge in real time

  //TODO: add time annotation to messages

  if (!messages || messagesLoading) {
    return <Loader />;
  }

  return (
    <ScrollArea h={maxHeight}>
      {messages.map((m) =>
        m.from === pb.authStore.model.id ? (
          <Message key={m.id} content={m.message} mine={true} />
        ) : (
          <Message key={m.id} content={m.message} mine={false} />
        )
      )}
    </ScrollArea>
  );
}

export default Messages;
