import { ScrollArea } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Body = ({ jobDescription, height }) => {
  return (
    <ScrollArea offsetScrollbars h={height}>
      <ReactMarkdown children={jobDescription} rehypePlugins={[rehypeRaw]} />
    </ScrollArea>
  );
};

export default Body;
