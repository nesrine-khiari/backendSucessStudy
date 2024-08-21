import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import axios from "axios";

const {
  REACT_APP_API_CLOUDINARY_URL,
  REACT_APP_API_CLOUDINARY_KEY,
  REACT_APP_API_IMG_PRESET_PROFILES,
  REACT_APP_API_IMG_PRESET_PRODUCS,
  REACT_APP_API_IMG_PRESET_CATEGS,
} = process.env;

const getPresetName = (folder) => {
  switch (folder) {
    case "product":
      return REACT_APP_API_IMG_PRESET_PRODUCS;
    case "categs":
      return REACT_APP_API_IMG_PRESET_CATEGS;
    case "profile":
      return REACT_APP_API_IMG_PRESET_PROFILES;
    default:
      return REACT_APP_API_IMG_PRESET_PRODUCS;
  }
};

const Uploader = (props) => {
  const { label, onChange, folder = "product", name } = props;
  const [Image, setImage] = useState({ url: "", progress: 0, done: false });
  const inputRef = useRef(null);
  const preset = getPresetName(folder);

  const handleClick = () => {
    if (Image.progress === 0 || Image.done) {
      setImage({ ...Image, progress: 0, done: false });
      inputRef.current.click();
    }
  };

  const changeImg = (event) => {
    let file = event.target.files[0];
    UploadImg(file, Image, setImage, preset);
  };

  useEffect(() => {
    if (Image.done) {
      let event = { target: { name: name, value: Image.url } };
      onChange(event);
    }
  }, [Image]);

  return (
    <label className="w-full">
      <Button
        className="m-auto block mb-2 w-full"
        label={
          <>
            {!Image.done && Image.progress === 0 && <span>{label}</span>}
            {Image.progress !== 0 && !Image.done && (
              <span>Uploading {Image.progress}</span>
            )}
            {Image.done && <span>Image Uploaded</span>}
          </>
        }
        icon={`pi ${Image.done ? "pi-check-square" : "pi-cloud-upload"}`}
        loading={Image.progress !== 100 && Image.progress !== 0}
        onClick={handleClick}
      />
      <input
        style={{ display: "none" }}
        ref={inputRef}
        onChange={changeImg}
        accept="image/*"
        multiple
        type="file"
      />
    </label>
  );
};

const UploadImg = (file, Image, SetImage, preset) => {
  // Initial File before upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tags", `Articles`);
  formData.append("upload_preset", preset);
  formData.append("api_key", REACT_APP_API_CLOUDINARY_KEY);
  formData.append("timestamp", (Date.now() / 1000) | 0);

  // To get the progress
  const config = {
    onUploadProgress: (progressEvent) => {
      SetImage({
        ...Image,
        progress: Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        ),
      });
    },
  };

  // the axios upload
  return axios
    .post(REACT_APP_API_CLOUDINARY_URL, formData, config, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
    .then((response) => {
      SetImage({
        ...Image,
        url: response.data.secure_url,
        done: response.statusText === "OK",
      });
    })
    .catch((error) => {
      //SetImg({...Img,error:true});
    });
};

export default Uploader;
