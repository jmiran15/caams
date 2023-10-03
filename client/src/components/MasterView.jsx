import { Stack } from "@mantine/core";
import JobRow from "./ClientJobRow";

const MasterView = ({ jobs }) => {
  return (
    <Stack>
      {jobs.map((job) => (
        <JobRow key={job.id} job={job} />
      ))}
    </Stack>
  );
};

export default MasterView;
