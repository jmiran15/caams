import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useContext, useEffect } from "react";
import { StatusContext } from "../context/JobStatusContext";

export default function Editor({
  description,
  setDescription,
  setCharacterCount,
}) {
  const status = useContext(StatusContext);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Already have a description? Paste it here!",
      }),
      CharacterCount.configure({
        limit: 5000,
      }),
    ],

    content: description,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
      setCharacterCount(5000 - editor.storage.characterCount.characters());
    },
    editable: status?.status ? status.status === "draft" : true,
  });
  // useEffect(() => {
  //   if (editor && description) {
  //     editor.commands.setContent(description);
  //   }
  // }, [editor]);

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />

          <RichTextEditor.BulletList />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content
        style={{ minHeight: "40vh", maxHeight: "40vh", overflowY: "auto" }}
      />
    </RichTextEditor>
  );
}
