import { useEffect } from "react";
import { Alert, Title, Text } from "@mantine/core";
import { TbAlertCircle } from "react-icons/tb";
import Debug from "debug";

const debug = new Debug(`caams:pages:demo:ReactQueryDemo.jsx`);

function NotFound() {
  useEffect(() => {
    debug("Component mounted!");
  }, []);

  return (
    <Alert icon={<TbAlertCircle size={16} />} title="Sorry!" color="orange">
      <Title order={1}>404</Title>
      <Text transform="uppercase">Page not found</Text>
    </Alert>
  );
}

export default NotFound;
