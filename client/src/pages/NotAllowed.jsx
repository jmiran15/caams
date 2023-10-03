import { Alert, Title, Text } from "@mantine/core";
import { TbAlertCircle } from "react-icons/tb";

function NotAllowed() {
  return (
    <Alert icon={<TbAlertCircle size={16} />} title="Bummer!" color="red">
      <Title order={1}>403</Title>
      <Text transform="uppercase">
        You are not authorized to access this page!
      </Text>
    </Alert>
  );
}

export default NotAllowed;
