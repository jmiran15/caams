import { useContext, useEffect, useState } from "react";
import { PocketbaseContext } from "../context/PocketbaseContext";

export default function useJob(jobId) {
  const pb = useContext(PocketbaseContext);
  const [job, setJob] = useState(undefined);

  useEffect(() => {
    if (jobId) {
      pb.collection("jobs")
        .getOne(jobId, {
          expand: "team",
        })
        .then((record) => {
          setJob(record);
        })
        .catch((err) => console.log("error getting job: ", err));
    }
  }, [jobId]);

  return job;
}
