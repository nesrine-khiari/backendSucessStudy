import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./toolBar";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";

export const TextEditor = ({
  name = "",
  value = "",
  placeholder = "",
  onChange,
  style = {},
}) => {
  const handleChange = (new_value) => {
    onChange({ target: { name, value: new_value } });
  };
  return (
    <div className={styles["text-editor"]}>
      <EditorToolbar name={name} />
      <ReactQuill
        theme="snow"
        className={styles["ql-editor"]}
        style={style}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        modules={modules(name)}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
