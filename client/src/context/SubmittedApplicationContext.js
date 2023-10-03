import { createContext } from "react";

export const SubmittedApplicationContext = createContext({
  submittedApplication: false,
  setSubmittedApplication: () => {},
});
