import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function useSmallerThanSm() {
  const theme = useMantineTheme();
  const smallerThanSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return smallerThanSm;
}
