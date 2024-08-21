import React, { useRef } from "react";
import { Button } from "primereact/button";
import styles from "./styles.module.scss";

function InputFile({ name = "", onChange, placeholder }) {
  const inputRef = useRef(null);

  const changeImg = (event) => {
    let file = event.target.files[0];
    onChange({ target: { name: name, value: file } });
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="w-100">
      <label className="w-full">
        <input
          type="file"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={changeImg}
          accept="image/*"
        />
        <Button
          label={placeholder}
          icon="pi pi-cloud-upload"
          className={`mr-2 mb-2 ${styles.main}`}
          onClick={handleClick}
        />
      </label>
    </div>
  );
}

export default InputFile;
