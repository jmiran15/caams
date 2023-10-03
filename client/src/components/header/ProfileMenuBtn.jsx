import { UnstyledButton, Group, Avatar, Menu, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../helpers/pocketbase";

function ProfileMenuItems({ items }) {
  const navigate = useNavigate();

  return (
    <>
      {items.map((item) => (
        <Menu.Item key={item.label} onClick={() => navigate(item.link)}>
          {item.label}
        </Menu.Item>
      ))}
      <Menu.Item
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </Menu.Item>
    </>
  );
}

export default function ProfileMenuBtn({
  firstName,
  avatar,
  profileMenuItems,
}) {
  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <UnstyledButton>
          <Group spacing="sm">
            {/* <Avatar radius="xl" size="sm" src={avatar} /> */}
            <Text size="sm">{firstName}</Text>
            <IconChevronDown size="0.8rem" stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <ProfileMenuItems items={profileMenuItems} />
      </Menu.Dropdown>
    </Menu>
  );
}
