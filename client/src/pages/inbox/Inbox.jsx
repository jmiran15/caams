import { useState, useEffect, useRef, useContext } from "react";
import { Text, Grid, Card, useMantineTheme, px, Center } from "@mantine/core";
import RecentMessageWindow from "./components/RecentMessageWindow";
import NewMessageWindow from "./components/NewMessageWindow";
import { PocketbaseContext } from "../../context/PocketbaseContext";
import useSmallerThanSm from "../../hooks/useSmallerThanSm";

function Inbox() {
  const pb = useContext(PocketbaseContext);
  const [messages, updateMessages] = useState("");
  const [recentUsers, updateRecentUsers] = useState([]);
  const [selectedUser, updateSelectedUser] = useState([]);
  const selectedUserRef = useRef(selectedUser);
  const [text, setText] = useState("");

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

    setText(""); //clear text after a message has been sent

    return record.id;
  };

  const getRecentUsers = async () => {
    const data = await pb.collection("messages").getList(1, 50, {
      expand: "from,to",
      filter: `from = "${pb.authStore.model.id}" || to = "${pb.authStore.model.id}"`,
      sort: "-created",
      $autoCancel: false,
    });

    let unique = [];

    //create a hash set to store unique ids
    let unique_ids = [];

    //iterate over the data items
    for (let i = 0; i < data.items.length; i++) {
      const cur = data.items[i];

      //handle outgoing messages
      if (cur.from === pb.authStore.model.id) {
        //if the to id is not in the hash set, add it to the hash set and add the item to the unique array
        if (!unique_ids.includes(cur.to)) {
          unique_ids.push(cur.to);
          cur.flag = "outgoing";
          unique.push(cur);
        }
      }

      //handle incoming messages
      if (cur.to === pb.authStore.model.id) {
        //if the from id is not in the hash set, add it to the hash set and add the item to the unique array
        if (!unique_ids.includes(cur.from)) {
          unique_ids.push(cur.from);
          cur.flag = "incoming";
          unique.push(cur);
        }
      }
    }

    updateRecentUsers(unique);
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
    getRecentUsers();
    //Eventually will need to refactor this to only listen to messages invovling the second user
    //Since we aren't building a chat app this should be okay. Lots of people all sending messages at once
    //will cause a lot of traffic to the api server
    pb.collection("messages").subscribe("*", (e) => {
      getMessages(selectedUserRef.current);
      getRecentUsers();
    });

    return () => {
      pb.collection("messages").unsubscribe("*");
    };
  }, []);

  useEffect(() => {
    selectedUserRef.current = selectedUser;

    const fetchData = async () => {
      const newMessages = await getMessages(selectedUser);
      await getRecentUsers();
      await markMessagesAsRead(selectedUser.id, newMessages);
    };

    fetchData();
  }, [selectedUser]);

  const theme = useMantineTheme();
  const vh = window.innerHeight;
  let gridHeight = vh - 60; // 60 for header
  let cardHeight = gridHeight - px(theme.spacing.xl) * 2; // py spacing

  const smallerThanSm = useSmallerThanSm();

  return (
    <Grid
      h={gridHeight}
      align="stretch"
      px={smallerThanSm ? "xl" : 160}
      py="xl"
      w="100vw"
    >
      <Grid.Col span={smallerThanSm ? 12 : 4}>
        <Card
          radius="md"
          padding="md"
          withBorder
          h={smallerThanSm ? cardHeight / 2 : cardHeight}
        >
          <RecentMessageWindow
            recentUsers={recentUsers}
            selectedUser={selectedUser}
            updateSelectedUser={updateSelectedUser}
            cardHeight={cardHeight}
          />
        </Card>
      </Grid.Col>
      {selectedUser.length === 0 ? ( //only show the new message window if a user is selected}
        <Grid.Col span={smallerThanSm ? 12 : 8}>
          <Card radius="md" padding="md" withBorder h={cardHeight}>
            <Center w="100%" h="100%">
              <Text>Select a user to begin chatting</Text>
            </Center>
          </Card>
        </Grid.Col>
      ) : (
        <Grid.Col span={smallerThanSm ? 12 : 8}>
          <Card radius="md" p="md" withBorder h={cardHeight}>
            <NewMessageWindow
              selectedUser={selectedUser}
              messages={messages}
              postMessage={postMessage}
              text={text}
              setText={setText}
              cardHeight={cardHeight}
            />
          </Card>
        </Grid.Col>
      )}
    </Grid>
  );
}

export default Inbox;
