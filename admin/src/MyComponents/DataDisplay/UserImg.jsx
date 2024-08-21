import React from "react";
import { useEffect } from "react";
import colors from "../../theme/AvatarColors";

const gcp = (caract) => {
    let pos = Math.floor((caract.toUpperCase().charCodeAt(0) - 64) / 5);
    if (pos > 4) {
        return 4;
    } else {
        return pos;
    }
};

function UserImg({ name = " ", lastname = " ", src, setColors = () => {} }) {
    let { txt, bg } = colors[gcp(name)];
    useEffect(() => {
        setColors(colors[gcp(name)]);
    }, [name, lastname]);
    return src && src.length > 4 ? (
        <div
            className=" border-circle w-full h-full "
            style={{
                backgroundImage: `url(${src})`,
                backgroundPosition: "50% 50%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        />
    ) : (
        <div
            className=" flex align-items-center justify-content-center border-round w-full h-full "
            style={{
                backgroundColor: bg,
            }}
        >
            <h1
                className=" center m-0 p-0"
                style={{ color: txt, fontSize: "4rem" }}
            >{`${name[0].toUpperCase()}${lastname[0].toUpperCase()}`}</h1>
        </div>
    );
}

export default UserImg;
