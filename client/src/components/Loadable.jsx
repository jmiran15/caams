import { LoadingOverlay } from "@mantine/core";
import { Suspense } from "react";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingOverlay visible={true} />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
