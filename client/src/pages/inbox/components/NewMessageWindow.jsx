import { Stack, useMantineTheme, px } from "@mantine/core";
import UserInfo from "./UserInfo";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useElementSize } from "@mantine/hooks";

function NewMessageWindow({
  messagesLoading,
  postMessage,
  messages,
  selectedUser,
  text,
  setText,
  cardHeight,
}) {
  const { ref: headerRef, height: headerHeight } = useElementSize();
  const { ref: inputRef, height: inputHeight } = useElementSize();
  const theme = useMantineTheme();
  let messagesHeight =
    cardHeight - 4 * px(theme.spacing.md) - headerHeight - inputHeight;

  return (
    <Stack h="100%" spacing="md">
      <UserInfo
        firstname={selectedUser.firstName}
        lastname={selectedUser.lastName}
        msg={"Message appears here."}
        avatar={null}
        componentRef={headerRef}
      />
      <Messages
        messagesLoading={messagesLoading}
        messages={messages}
        maxHeight={messagesHeight}
      />
      <MessageInput
        selectedUser={selectedUser}
        postMessage={postMessage}
        text={text}
        setText={setText}
        componentRef={inputRef}
      />
    </Stack>
  );
}

export default NewMessageWindow;
