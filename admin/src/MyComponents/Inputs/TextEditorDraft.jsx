import React, { useState, useEffect } from "react";

import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertFromHTML,
  ContentState,
  convertToRaw,
} from "draft-js";
// import { stateToHTML } from "draft-js-export-html";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor(props) {
  const { name, value = "", onChange } = props;

  const [editor, setEditor] = useState(EditorState.createEmpty());
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!typing) {
      setEditor(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(value).contentBlocks,
            convertFromHTML(value).entityMap
          )
        )
      );
    }
  }, [value]);

  const onEditorStateChange = (newData) => {
    let html = draftToHtml(convertToRaw(newData.getCurrentContent()));
    onChange({ target: { name: name, value: html } });
    setEditor(newData);
  };

  return (
    <div
      onClick={() => {
        setTyping(true);
      }}
      style={{
        height: "100%",
        overflow: "scroll",
        border: "solid 1px black",
      }}
    >
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        editorState={editor}
      />
    </div>
  );
}

export default TextEditor;
