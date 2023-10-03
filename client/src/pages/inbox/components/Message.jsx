import React from "react";
import { Text } from "@mantine/core";

const Message = ({ content, mine }) => {
  const contentLength = content.length;
  const maxWidth = contentLength > 50 ? "80%" : "auto";
  const bubbleColor = mine ? "#228be6" : "gray";
  const bubbleAlignment = mine ? "flex-end" : "flex-start";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: bubbleAlignment,
        margin: "4px",
      }}
    >
      <div
        style={{
          maxWidth,
          borderRadius: "8px",
          backgroundColor: bubbleColor,
          padding: "8px",
          wordWrap: "break-word",
          display: "inline-block", // Add this line to center the colored bubble within the div
        }}
      >
        <Text size="sm" color="white" align="left">
          {content}
        </Text>
      </div>
    </div>
  );
};

export default Message;
