import { Text, Group, Avatar } from "@mantine/core";

function UserInfo({ firstname, lastname, avatar, componentRef }) {
  return (
    <Group ref={componentRef}>
      {/* <Avatar radius="xl" size="lg" src={avatar} alt="no image here" /> */}
      <Text size="ml" fw={700}>
        {firstname} {lastname}
      </Text>
    </Group>
  );
}

export default UserInfo;
