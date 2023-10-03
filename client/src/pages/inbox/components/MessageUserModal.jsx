import { useState, useEffect, useContext } from "react";
import NewMessageWindow from "./NewMessageWindow";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

function MessageUserModal({ selectedUser }) {
  const pb = useContext(PocketbaseContext);
  const [text, setText] = useState("");
  const [messages, updateMessages] = useState("");

  //function to post a message
  const postMessage = async (from, to, text) => {
    // example create data
    const data = {
      from: `${from}`,
      to: `${to}`,
      message: `${text}`,
      read: false,
    };

    const record = await pb.collection("messages").create(data);

    return record.id;
  };

  const getMessages = async (to) => {
    const myData = await pb.collection("messages").getList(1, 50, {
      expand: "from",
      filter: `from = "${pb.authStore.model.id}" && to = "${to.id}"`,
      $autoCancel: false,
    });

    const yourData = await pb.collection("messages").getList(1, 50, {
      expand: "from",
      filter: `from = "${to.id}" && to = "${pb.authStore.model.id}"`,
      $autoCancel: false,
    });

    //concatenate the two arrays
    const resultList = myData.items.concat(yourData.items);

    //sort the array by date ascending
    resultList.sort(function (a, b) {
      return new Date(a.created) - new Date(b.created);
    });

    //set state when the data is received
    updateMessages(resultList);
    return resultList;
  };

  //mark all messages from a specific user as read
  const markMessagesAsRead = async (from, messages) => {
    for (let i = 0; i < messages.length; i++) {
      //if the messages is from the specified user mark it as read
      if (messages[i].from === from) {
        messages[i].read = true;
        const data = {
          from: `${from}`,
          to: `${pb.authStore.model.id}`,
          read: true,
        };
        //mark the message as read
        const record = await pb
          .collection("messages")
          .update(messages[i].id, data);
      }
    }
  };

  useEffect(() => {
    getMessages(selectedUser);

    //TODO: Consider marking messages as read when the user clicks on the message window

    //Eventually will need to refactor this to only listen to messages invovling the second user
    //Since we aren't building a chat app this should be okay. Lots of people all sending messages at once
    //will cause a lot of traffic to the api server
    pb.collection("messages").subscribe("*", (e) => {
      getMessages(selectedUser);
    });

    return () => {
      pb.collection("messages").unsubscribe("*");
    };
  }, []);

  return (
    <NewMessageWindow
      selectedUser={selectedUser}
      messages={messages}
      postMessage={postMessage}
      text={text}
      setText={setText}
    />
  );
}

export default MessageUserModal;
