import React from "react";
import { Avatar } from "primereact/avatar";
import colors from "../../theme/AvatarColors";

// a function to Get Color Pos
const gcp = (caract) => {
  let pos = Math.floor((caract.charCodeAt(0) - 64) / 5);
  if (pos > 4) {
    return 4;
  } else {
    return pos;
  }
};

const AvatarLabel = ({ label, circle }) => {
  let { txt, bg } = colors[gcp(label)];
  return (
    <Avatar
      size="large"
      label={label}
      shape={circle ? "circle" : "square"}
      style={{ backgroundColor: bg, color: txt }}
    />
  );
};

const AvatarImg = ({ src, circle }) => {
  return (
    <Avatar
      size="large"
      image={src}
      shape={circle ? "circle" : "square"}
      style={{ objectFit: "cover" }}
    />
  );
};

function AvatarComponent({ name = " ", lastname = " ", src, circle = false }) {
  return src && src.length > 4 ? (
    <AvatarImg src={src} circle={circle} />
  ) : (
    <AvatarLabel
      label={`${name[0].toUpperCase()}${lastname[0]?.toUpperCase() || ""}`}
      circle={circle}
    />
  );
}

export default AvatarComponent;
